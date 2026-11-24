import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import FAQSection from '@/components/contact/FAQSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-20 bg-brand-darkest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            Reach Out to Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Contact &amp; Get Involved
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            Whether you want to coach a young player, donate equipment, or explore institutional sponsorship,
            we are eager to connect with you.
          </p>
        </div>
      </section>

      {/* Form + Info Grid */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Info Column (5 cols) */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </div>
  );
}
