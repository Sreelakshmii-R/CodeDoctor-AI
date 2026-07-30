import { Bell } from "lucide-react";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  async function loadNotifications() {
    try {
      const response = await fetch(
        "http://localhost:8000/dashboard/activity"
      );

      const data = await response.json();

      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadNotifications();
}, []);

  return (
    <nav
      className="
        relative
        h-20
        px-10
        bg-white
        border-b
        border-[#E2E8F0]
        flex
        items-center
        justify-between
      "
    >
      {/* Brand */}
      <Logo />

      {/* Navigation */}
      <div className="flex items-center gap-10 ml-10 h-full">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `
              h-full
              flex
              items-center
              border-b-2
              transition-all
              duration-200
              ${
                isActive
                  ? "text-[#0F766E] font-semibold border-[#0F766E]"
                  : "text-[#334155] border-transparent hover:text-[#0F766E]"
              }
            `
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/repositories"
          className={({ isActive }) =>
            `
              h-full
              flex
              items-center
              border-b-2
              transition-all
              duration-200
              ${
                isActive
                  ? "text-[#0F766E] font-semibold border-[#0F766E]"
                  : "text-[#334155] border-transparent hover:text-[#0F766E]"
              }
            `
          }
        >
          Repositories
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button
        onClick={() => setOpen(!open)}
          className="
            w-11
            h-11
            rounded-full
            border
            border-[#E2E8F0]
            flex
            items-center
            justify-center
            hover:bg-slate-50
            transition-colors
          "
        >
          <Bell size={19} />

          {notifications.length > 0 && (
            <span
              className="
                absolute
                top-2
                right-2
                w-2
                h-2
                bg-red-500
                rounded-full
              "
            />
          )}
        </button>

        {
  open && (
    <div
      className="
        absolute
        right-24
        top-16
        w-80
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-xl
        p-4
        z-50
      "
    >
      <h3 className="font-semibold mb-4">
        Notifications
      </h3>

      {notifications.length === 0 ? (
        <p className="text-slate-500">
          No notifications.
        </p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            className="border-b py-3 last:border-none"
          >
            <p className="font-medium text-slate-800">
              ✅ {item.repository} analyzed
            </p>

            <p className="text-sm text-slate-500">
              {item.message}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {new Date(item.created_at).toLocaleString()}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

        <div
          className="
            w-11
            h-11
            rounded-full
            bg-[#0F766E]
            text-white
            flex
            items-center
            justify-center
            font-semibold
          "
        >
          SR
        </div>
      </div>
    </nav>
  );
}

export default Navbar;