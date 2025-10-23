# Test Link Patterns

Testing the fix-links script regex patterns:

## Should be fixed (add trailing slash):
- [Normal link](../../path)
- [Another link](../other)

## Should NOT be fixed (has anchor):
- [Link with anchor](../../path#section)
- [Parameters link](../../tags-reference/core/pages#parameters)

## Already correct (should not change):
- [Correct link](../../path/)
- [Correct with anchor](../../path/#section)

