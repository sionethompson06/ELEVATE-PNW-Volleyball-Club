export default function Footer() {
  return (
    <footer className="border-t border-[#d4af37]/15 bg-black/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            ELEVATE
          </p>
          <h3 className="mt-3 text-xl font-black text-white">
            PNW Volleyball Club
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
            A premium, mobile-friendly club platform built for development,
            communication, and a stronger athlete experience.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h4>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Email: info@elevatepnwvolleyball.com</p>
            <p>Location: Portland Metro / Tigard Area</p>
            <p>Experience: Club teams, clinics, and development</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Club Access
          </h4>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Admin portal</p>
            <p>Parent portal</p>
            <p>Coach portal</p>
            <p>Player portal</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#d4af37]/10 px-4 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} ELEVATE PNW Volleyball Club. All rights reserved.
      </div>
    </footer>
  );
}
