
import Button from '../../../components/base/Button';

export default function AboutSection() {
  const achievements = [
    {
      number: '95%',
      label: 'שביעות רצון לקוחות',
      description: 'מהלקוחות מדווחים על שיפור משמעותי'
    },
    {
      number: '15+',
      label: 'הכשרות ותעודות',
      description: 'הסמכות מקצועיות בתחום הטיפול'
    },
    {
      number: '500+',
      label: 'לקוחות מרוצים',
      description: 'שקיבלו טיפול וליווי מקצועי'
    }
  ];

  const benefits = [
    'גישה אישית ומותאמת לכל לקוח',
    'שיטות טיפול מתקדמות ומוכחות',
    'זמינות גבוהה וגמישות בזמנים',
    'תמיכה רציפה לאורך כל הדרך',
    'תוצאות מדידות ומשמעותיות'
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="https://static.readdy.ai/image/0a3054afb3e73704d33cc7321f0eb249/fc3a9bf42a68bc10ccc1010734852199.png"
                alt="מטפל מקצועי"
                className="w-full h-96 lg:h-[500px] object-cover object-top rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">שנות ניסיון</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-right space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                למה לבחור בי?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                אני מאמין בכוח של הטיפול המקוון לשנות חיים. עם שנות ניסיון רבות בתחום, 
                אני מתמחה בשילוב של טכניקות מתקדמות עם גישה אישית וחמה.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-blue-900 mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-sm font-semibold text-blue-700 mb-2">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                יתרונות הקורס:
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center justify-end">
                    <span className="text-gray-700">{benefit}</span>
                    <i className="ri-check-double-line text-blue-600 text-xl mr-3"></i>
                  </li>
                ))}
              </ul>
            </div>

            {/* Belief Statement */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-r-4 border-blue-600">
              <p className="text-blue-900 font-medium italic text-lg">
                "אני מאמין שכל אדם יכול להגשים את המטרות שלו ולחיות חיים מלאים ומשמעותיים. 
                המפתח הוא למצוא את הכלים הנכונים ולקבל את התמיכה המתאימה."
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                size="lg"
                onClick={() => window.location.href = '#cta'}
              >
                הירשם עכשיו
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '#testimonials'}
              >
                קרא המלצות
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
