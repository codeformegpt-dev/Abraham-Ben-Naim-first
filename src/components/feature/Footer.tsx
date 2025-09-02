
import { useState } from 'react';
import Button from '../base/Button';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: '"Pacifico", serif' }}>
              logo
            </h3>
            <p className="text-blue-100 mb-4">
              קורסים וטיפולים מקוונים מקצועיים לשיפור איכות החיים
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-blue-100 hover:text-white transition-colors">שירותים</a></li>
              <li><a href="#about" className="text-blue-100 hover:text-white transition-colors">מי אני</a></li>
              <li><a href="#testimonials" className="text-blue-100 hover:text-white transition-colors">המלצות</a></li>
              <li><a href="#how-it-works" className="text-blue-100 hover:text-white transition-colors">איך זה עובד</a></li>
              <li><a href="/contact" className="text-blue-100 hover:text-white transition-colors">צור קשר</a></li>
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">מידע משפטי</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">מדיניות פרטיות</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">הצהרת נגישות</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">אתיקה מקצועית</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">הישאר מעודכן</h4>
            <p className="text-blue-100 mb-4 text-sm">
              קבל עדכונים על קורסים חדשים וטיפים חינמיים
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="הכנס כתובת אימייל"
                className="w-full px-3 py-2 bg-blue-800 text-white placeholder-blue-200 rounded-lg border border-blue-700 focus:outline-none focus:border-blue-500"
                required
              />
              <Button type="submit" variant="secondary" size="sm" className="w-full">
                הירשם לניוזלטר
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-100 text-sm">
            © 2024 כל הזכויות שמורות. האתר מוגן בזכויות יוצרים ובתקנות הגנת הפרטיות.
          </p>
        </div>
      </div>
    </footer>
  );
}
