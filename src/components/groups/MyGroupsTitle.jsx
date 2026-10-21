import Label from "../common/Label.jsx";

export default function MyGroupsTitle({ count }) {
  return (
    <div>
      <Label className="mb-3">My groups</Label>
      <h1 className="text-[32px] font-semibold">Groups you organize</h1>
      <p className="mt-2 text-sm font-medium text-muted">
        {count} {count === 1 ? "group" : "groups"} · open one to see who wants to join
      </p>
    </div>
  );
}
