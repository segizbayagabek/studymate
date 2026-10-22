import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, initialsOf, logout } from "../../api.js";

export default function AccountMenu() {
  const user = getUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex size-8.5 items-center justify-center rounded-full bg-navy text-xs font-bold text-white"
      >
        {user ? initialsOf(user.name) : "AT"}
      </button>

      {open && (
        <div className="absolute top-full right-0 z-20 mt-2 min-w-36 rounded-xl border border-navy/10 bg-paper p-1 shadow-lg">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-navy hover:bg-warm"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
