#!/bin/bash
# Run TypeScript type-check after Claude edits or writes TypeScript files

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only type-check TypeScript files
case "$FILE_PATH" in
  *.ts|*.tsx)
    RESULT=$(npx tsc --noEmit 2>&1)
    EXIT_CODE=$?

    if [ $EXIT_CODE -ne 0 ]; then
      echo "TypeScript errors detected after editing $FILE_PATH:" >&2
      echo "$RESULT" >&2
      exit 2
    fi
    ;;
esac

exit 0
