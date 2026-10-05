<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep the referenced product sales experience on the index route as one continuous page; its galleries and plan anchors belong to the same purchase journey.
- Store original downloaded media as project asset pointers and resolve them through the shared material asset module; this avoids third-party image hotlinks.
- Use the shared Button component for interactive controls and global semantic CSS tokens for the sales-page palette; this keeps presentation consistent.
