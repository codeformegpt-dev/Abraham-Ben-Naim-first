import Button from '../../../components/base/Button';

export default function ServicesSection() {
  const services = [
    {
      icon: 'ri-mind-map-line',
      title: 'ניקוי חסימות נפשיות',
      description: 'שחרור הפוטנציאל על ידי זיהוי והסרה של חסימות שמונעות ממך להגשים חלומות ומטרות',
      features: ['זיהוי חסימות', 'טכניקות שחרור', 'בניית ביטחון עצמי']
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'טיפול בבעיות פיזיות',
      description: 'גישה הוליסטית לטיפול בכאבים כרוניים, מתח ובעיות פיזיות דרך הקשר בין הנפש לגוף',
      features: ['הקלה על כאבים', 'שיפור תפקוד', 'איזון אנרגטי']
    },
    {
      icon: 'ri-brain-line',
      title: 'פגישה עם תת-המודע',
      description: 'חקור את העומקים של תת-הראיון שלך, גלה דפוסי התנהגות וצור שינויים משמעותיים בחיים',
      features: ['הכרת עצמית עמוקה', 'שינוי דפוסים', 'פיתוח אינטואיציה']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            השירותים שלי
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מגוון רחב של שירותי טיפול וקורסים מקוונים המותאמים לצרכים האישיים שלך
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Icon */}
              {index === 0 ? (
                <div className="w-16 h-16 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Peaceful%20meditation%20and%20mental%20healing%2C%20serene%20human%20silhouette%20with%20glowing%20light%20representing%20mental%20clarity%20and%20liberation%20from%20inner%20blocks%2C%20soft%20blue%20and%20purple%20gradients%2C%20spiritual%20energy%20flowing%2C%20minimalist%20style%2C%20calming%20atmosphere%2C%20inner%20peace%20visualization%2C%20consciousness%20expansion%2C%20therapeutic%20healing%20vibes&width=64&height=64&seq=service1&orientation=squarish"
                    alt="ניקוי חסימות נפשיות"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${service.icon} text-2xl text-white`}></i>
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold text-blue-900 mb-4 text-right">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-right mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center justify-end text-right">
                    <span className="text-gray-700">{feature}</span>
                    <i className="ri-check-line text-green-500 mr-2"></i>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="md"
                  className="w-full group-hover:bg-blue-900 group-hover:text-white group-hover:border-blue-900"
                  onClick={() => window.location.href = '#contact'}
                >
                  למידע נוסף
                  <i className="ri-arrow-left-line mr-2"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            onClick={() => window.location.href = '#cta'}
          >
            התחל את המסע שלך עכשיו
          </Button>
        </div>
      </div>
    </section>
  );
}
