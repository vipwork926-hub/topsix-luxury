import DynamicImage from "@/components/ui/DynamicImage";

export default function PackagingSection() {
  return (
    <section className="border-y border-white/10 bg-[#0a0908] px-4 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
        <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_at_center,_#28241f_0%,_#11100f_48%,_#080808_100%)] p-8 sm:min-h-[500px]">
          <DynamicImage siteImage="packaging" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div aria-hidden="true" className="absolute h-[72%] w-[78%] rotate-[-5deg] border border-white/10 bg-[#11100f] shadow-2xl shadow-black/60">
            <div className="absolute inset-[5%] flex items-center justify-center border border-white/10 bg-[#eeeae1]">
              <div className="absolute inset-3 border border-black/10" />
              <span className="relative font-serif text-2xl tracking-[0.3em] text-[#1b1917]">TOPSIX</span>
            </div>
          </div>
          <div aria-hidden="true" className="absolute bottom-[13%] right-[8%] w-[34%] rotate-[7deg] border border-white/15 bg-[#171615] px-4 py-5 shadow-xl shadow-black/40 sm:px-6 sm:py-7">
            <div className="border border-white/10 px-3 py-4 text-center sm:px-5 sm:py-6">
              <span className="block font-serif text-lg tracking-[0.22em] text-ivory sm:text-xl">TOPSIX</span>
              <span className="mt-2 block text-[7px] uppercase tracking-[0.2em] text-champagne sm:text-[8px]">A private moment</span>
            </div>
          </div>
          <div aria-hidden="true" className="absolute bottom-[8%] left-[8%] -rotate-6 border border-white/15 bg-[#e9e4da] px-4 py-3 text-center shadow-lg shadow-black/30 sm:px-5">
            <span className="block font-serif text-sm italic text-[#37322c]">A softer kind of arrival</span>
            <span className="mt-1 block text-[7px] uppercase tracking-[0.17em] text-[#766b5a]">Scented card / keep close</span>
          </div>
          <span className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.24em] text-ivory/45">The unboxing / 01</span>
        </div>

        <div className="max-w-xl">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-champagne">Considered down to the last detail</span>
          <h2 className="font-serif text-4xl uppercase leading-tight tracking-[0.12em] md:text-5xl">Your moment starts here.</h2>
          <p className="mt-6 font-serif text-xl leading-relaxed text-ivory/65">
            A matte-black keepsake box. Ivory tissue folded by hand. A quiet scent card, tucked inside for you to find.
          </p>
          <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
            <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-champagne">The box</span>
              <span className="text-sm text-ivory/65">Matte black, made to keep long after.</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-champagne">The reveal</span>
              <span className="text-sm text-ivory/65">Soft ivory tissue, folded around your piece.</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-champagne">The detail</span>
              <span className="text-sm text-ivory/65">A subtle scent card, added to make it yours.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}