export default function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">
        ☼
      </span>
      <h2>Nothing calling for you yet.</h2>
      <p>Add a small reminder for the thing you want to return to.</p>
    </div>
  );
}
