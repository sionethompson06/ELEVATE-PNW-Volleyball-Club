export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#d4af37]/15 bg-black/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            ELEVATE
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            PNW Volleyball Club
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
            Developing confident athletes through competitive training,
            intentional coaching, and a strong team culture.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h4>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Email: info@elevatepnwvolleyball.com</p>
            <p>Location: Portland Metro / Tigard Area</p>
            <p>Season: Club, clinics, and player development</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Portals
          </h4>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Admin access</p>
            <p>Parent access</p>
            <p>Coach access</p>
            <p>Player access</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#d4af37]/10 px-4 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} ELEVATE PNW Volleyball Club. All rights reserved.
      </div>
    </footer>
  );
}
