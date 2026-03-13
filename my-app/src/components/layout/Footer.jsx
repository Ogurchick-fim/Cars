import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg">AutoPilot</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Smart car comparison and marketplace. Find, compare, and buy your perfect car.
          </p>
        </div>
        {[
          { title: "Product", links: [["Browse Cars", "/cars"], ["Compare", "/compare"], ["Recommendations", "/recommend"]] },
          { title: "Company", links: [["About", "#"], ["Careers", "#"], ["Contact", "#"]] },
          { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Cookies", "#"]] },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-display font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2.5">
              {section.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
        <p className="text-sm opacity-50">© 2026 AutoPilot. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
