# Docs Skill

Generate or update documentation for Terrae components.

## Reference

Use `src/app/docs/lines-animated/page.tsx` as the reference for component documentation structure and patterns.

## Instructions

1. **Determine Documentation Type**
   Ask the user what they need:
   - Component documentation page
   - Weeklog entry
   - README update
   - API reference

2. **For Component Documentation**
   Location: `src/app/docs/{component-name}/page.tsx`
   Examples Location: `src/app/docs/_components/examples/{example-name}.tsx`

   Structure:
   - Title and description (in DocsLayout)
   - Installation section
   - First example (directly after installation, NO title/description)
   - Additional examples (each with DocsSection title and description)
   - Animation Modes or similar feature explanations (if applicable)
   - Properties table
   - Use Cases grid
   - Performance Tips

3. **Example Component Patterns**
   - Use `h-full w-full` for the container div (NOT fixed heights like `h-[400px]`)
   - The ComponentPreview wrapper handles sizing
   - Always get accessToken from environment variable
   - Example structure:

     ```tsx
     export const ExampleName = () => {
       const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

       return (
         <div className="h-full w-full">
           <Map accessToken={accessToken} center={CENTER} zoom={10}>
             {/* Component here */}
           </Map>
         </div>
       )
     }
     ```

4. **For Weeklog Entries**
   Location: `src/app/docs/weeklog/page.tsx`

   Add new entries at the top with:
   - Date
   - Summary of changes
   - Links to relevant components

5. **Documentation Patterns**
   - Use code blocks with proper syntax highlighting
   - Include working examples
   - Show both basic and advanced usage
   - Document all props with types and defaults
   - Add visual examples where helpful
   - Use DocsCode for inline code references
   - Use DocsLink for external links

6. **Review Process**
   - Show the documentation to the user before saving
   - Ask for feedback and adjustments
   - Only save after user approval
