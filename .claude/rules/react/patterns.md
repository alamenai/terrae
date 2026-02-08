# React Patterns

## Component Size and Composability

Keep components small and focused. Large components are hard to test, maintain, and reuse. Break them into smaller, composable pieces.

```typescript
// ❌ Avoid - large monolithic component
const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);

  // 50+ lines of useEffects, handlers, and logic...

  return (
    <div>
      <header>{/* 30 lines of header JSX */}</header>
      <nav>{/* 40 lines of navigation JSX */}</nav>
      <main>
        <section>{/* 50 lines of posts JSX */}</section>
        <aside>{/* 30 lines of sidebar JSX */}</aside>
      </main>
      <footer>{/* 20 lines of footer JSX */}</footer>
    </div>
  );
};

// ✅ Good - composed of focused components
const UserDashboard = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardNav />
      <DashboardContent>
        <PostsFeed />
        <DashboardSidebar />
      </DashboardContent>
      <DashboardFooter />
    </DashboardLayout>
  );
};

// Each child component handles its own data and logic
const PostsFeed = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <PostsSkeleton />;
  }

  return (
    <section>
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </section>
  );
};
```

### Signs a Component is Too Large

- More than 150-200 lines of code
- More than 3-4 useEffect hooks
- More than 5-6 pieces of state
- Deeply nested JSX (4+ levels)
- Multiple unrelated responsibilities
- Difficult to name (doing too many things)

### Composability Principles

- **Single Responsibility**: Each component does one thing well
- **Reusability**: Components can be used in multiple contexts
- **Testability**: Small components are easier to unit test
- **Readability**: Component name tells you what it does
- **Flexibility**: Compose simple components into complex UIs

```typescript
// ✅ Good - composable building blocks
const Card = ({ children }: { children: ReactNode }) => {
  return <div className="card">{children}</div>;
};

const Avatar = ({ src, alt }: AvatarProps) => {
  return <img className="avatar" src={src} alt={alt} />;
};

const UserInfo = ({ name, role }: UserInfoProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <span>{role}</span>
    </div>
  );
};

// Composed into a UserCard
const UserCard = ({ user }: { user: User }) => {
  return (
    <Card>
      <Avatar src={user.avatarUrl} alt={user.name} />
      <UserInfo name={user.name} role={user.role} />
    </Card>
  );
};
```

## Compound Components

Use compound components for related UI elements that share implicit state. This provides a flexible, declarative API.

```typescript
// ✅ Good - compound components
<Menu>
  <Menu.Trigger>Open</Menu.Trigger>
  <Menu.List>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Delete</Menu.Item>
  </Menu.List>
</Menu>

// ❌ Avoid - prop drilling everything
<Menu
  trigger="Open"
  items={[{ label: "Edit" }, { label: "Delete" }]}
/>
```

## Render Props

Use render props when you need to share stateful logic while letting the consumer control rendering.

```typescript
// ✅ Good - render prop for flexible rendering
<MouseTracker>
  {({ x, y }) => {
    return <Cursor position={{ x, y }} />;
  }}
</MouseTracker>

// Component implementation
const MouseTracker = ({ children }: MouseTrackerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // ... mouse tracking logic

  return children(position);
};
```

## Custom Hooks for Logic Reuse

Extract reusable stateful logic into custom hooks instead of duplicating across components.

```typescript
// ✅ Good - reusable hook
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// Usage
const [theme, setTheme] = useLocalStorage("theme", "light")
```

## Controlled vs Uncontrolled Components

Prefer controlled components for form inputs. Use uncontrolled only when integrating with non-React code.

```typescript
// ✅ Good - controlled component
const Form = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input value={value} onChange={handleChange} />;
};

// ⚠️ Uncontrolled - only when necessary
const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  return <input ref={inputRef} defaultValue="" />;
};
```

## Container/Presenter Pattern

Separate data fetching and business logic (container) from rendering (presenter).

```typescript
// Container - handles logic
const UserListContainer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <UserList users={users} />;
};

// Presenter - pure rendering
const UserList = ({ users }: UserListProps) => {
  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
};
```

## Provider Pattern

Use context providers to share state across deeply nested components without prop drilling.

```typescript
// Create context with type
type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// Provider component
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
```

## Higher-Order Components (HOC)

Use HOCs sparingly for cross-cutting concerns. Prefer hooks when possible.

```typescript
// HOC for adding loading state
const withLoading = <P extends object>(
  Component: ComponentType<P>
) => {
  return ({ isLoading, ...props }: P & { isLoading: boolean }) => {
    if (isLoading) {
      return <Spinner />;
    }
    return <Component {...(props as P)} />;
  };
};

// Usage
const UserListWithLoading = withLoading(UserList);
```

## Polymorphic Components

Create components that can render as different HTML elements using the `as` prop.

```typescript
type BoxProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Box = <T extends ElementType = "div">({
  as,
  children,
  ...props
}: BoxProps<T>) => {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
};

// Usage
<Box as="section" className="container">Content</Box>
<Box as="article">Article content</Box>
```

## Slot Pattern

Use slots for flexible component composition with named areas.

```typescript
type CardProps = {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

const Card = ({ header, children, footer }: CardProps) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// Usage
<Card
  header={<h2>Title</h2>}
  footer={<Button>Submit</Button>}
>
  <p>Card content here</p>
</Card>
```

## State Reducer Pattern

Allow consumers to customize state updates by providing their own reducer.

```typescript
type Action = { type: "increment" } | { type: "decrement" }
type State = { count: number }

const defaultReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    default:
      return state
  }
}

const useCounter = (reducer = defaultReducer) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  const increment = () => {
    dispatch({ type: "increment" })
  }

  const decrement = () => {
    dispatch({ type: "decrement" })
  }

  return { count: state.count, increment, decrement }
}

// Custom reducer that prevents negative numbers
const customReducer = (state: State, action: Action): State => {
  const newState = defaultReducer(state, action)
  return { count: Math.max(0, newState.count) }
}

// Usage
const { count, decrement } = useCounter(customReducer)
```

## Forwarding Refs

Forward refs to allow parent components to access child DOM elements.

```typescript
type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        {label}
        <input ref={ref} {...props} />
      </label>
    );
  }
);

Input.displayName = "Input";

// Usage
const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return <Input ref={inputRef} label="Name" />;
};
```
