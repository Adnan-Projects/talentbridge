import { Mail, Phone, MapPin, Globe, Share2, MessageSquare, Send, Clock } from 'lucide-react';

const contactDetails = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'info@talentbridge.org.uk',
    description: 'We reply within 1–2 business days.',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+44 20 7000 0000',
    description: 'Mon–Fri from 9:00 AM to 5:30 PM.',
  },
  {
    icon: MapPin,
    title: 'Central Hub',
    value: 'London, United Kingdom',
    description: 'Serving youth initiatives nationwide.',
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    value: 'Monday – Friday',
    description: '9:00 AM – 6:00 PM GMT',
  },
];

const socials = [
  { icon: Globe, href: 'https://twitter.com', label: 'Twitter / X' },
  { icon: Share2, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: MessageSquare, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Send, href: 'https://facebook.com', label: 'Community' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-brand-darkest mb-2">Get in Touch Directly</h3>
        <p className="text-sm text-brand-secondary leading-relaxed">
          Have questions about referral partnerships, volunteering requirements, or equipment donations?
          Our team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactDetails.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-darkest mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">
                  {item.title}
                </p>
                <p className="text-sm font-bold text-brand-darkest mt-0.5">{item.value}</p>
                <p className="text-xs text-brand-subtle mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="p-6 bg-white rounded-2xl border border-brand-border shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-3">
          Follow Our Community
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-darkest hover:bg-brand-darkest hover:text-white transition-colors duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
