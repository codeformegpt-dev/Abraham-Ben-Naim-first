
import { useState } from 'react';

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'שרה כהן',
      role: 'מנהלת שיווק',
      image: 'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20smiling%20confidently%2C%20warm%20and%20genuine%20expression%2C%20modern%20office%20background%2C%20natural%20lighting%2C%20high%20quality%20professional%20headshot%20photography%2C%20trustworthy%20appearance&width=300&height=300&seq=testimonial1&orientation=squarish',
      text: 'הקורס שינה את חיי לחלוטין. הצלחתי להתגבר על חסימות שליוו אותי שנים ולהגשים חלומות שחשבתי שאף פעם לא יתממשו. התמיכה והליווי המקצועי היו מדהימים.',
      rating: 5,
      challenge: 'חסימות בקריירה',
      result: 'קידום למנהלת בכירה'
    },
    {
      name: 'דוד לוי',
      role: 'יזם טכנולוגי',
      image: 'https://readdy.ai/api/search-image?query=Successful%20entrepreneur%20in%20casual%20business%20attire%2C%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20natural%20lighting%2C%20professional%20portrait%20photography%2C%20innovative%20and%20dynamic%20appearance&width=300&height=300&seq=testimonial2&orientation=squarish',
      text: 'הגישה החדשנית והטכנולוגיה המתקדמת של הקורס המקוון אפשרו לי לעבוד על עצמי בקצב שלי. התוצאות היו מעבר לכל הציפיות - הקמתי חברה מצליחה ושיפרתי את איכות החיים.',
      rating: 5,
      challenge: 'פחד מכישלון',
      result: 'הקמת חברת סטארט-אפ מצליחה'
    },
    {
      name: 'מירי אברמוביץ',
      role: 'אמא וקוסמטיקאית',
      image: 'https://readdy.ai/api/search-image?query=Caring%20mother%20and%20professional%20beautician%2C%20warm%20and%20nurturing%20expression%2C%20bright%20salon%20background%2C%20natural%20lighting%2C%20professional%20headshot%20photography%2C%20approachable%20and%20confident%20appearance&width=300&height=300&seq=testimonial3&orientation=squarish',
      text: 'כאמא עובדת, קשה היה לי למצוא זמן לטיפול פרטני. הקורס המקוון נתן לי בדיוק מה שהייתי צריכה - גמישות ותוצאות. הצלחתי להקים עסק עצמאי ולמצוא איזון בחיים.',
      rating: 5,
      challenge: 'חוסר איזון עבודה-בית',
      result: 'פתיחת סלון יופי עצמאי'
    },
    {
      name: 'אמיר ישראלי',
      role: 'מהנדס',
      image: 'https://readdy.ai/api/search-image?query=Professional%20engineer%20with%20glasses%2C%20intelligent%20and%20focused%20expression%2C%20modern%20engineering%20office%20background%2C%20natural%20lighting%2C%20professional%20portrait%20photography%2C%20analytical%20and%20trustworthy%20appearance&width=300&height=300&seq=testimonial4&orientation=squarish',
      text: 'הטיפול בבעיות הפיזיות שהיו לי דרך הגישה הנפש-גוף היה פורץ דרך. כאבי הגב הכרוניים נעלמו תוך חודשיים, והביטחון העצמי שלי עלה משמעותית.',
      rating: 5,
      challenge: 'כאבי גב כרוניים',
      result: 'החלמה מלאה ושיפור איכות חיים'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const logos = [
    'Google', 'Microsoft', 'Apple', 'Facebook', 'Amazon', 'Netflix'
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            סיפורי הצלחה של לקוחותינו
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            גלה איך הקורסים שלנו שינו חיים של אנשים אמיתיים ועזרו להם להגשים את המטרות שלהם
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-2xl"></i>
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-blue-50">
                "{testimonials[currentSlide].text}"
              </blockquote>
            </div>

            <div className="flex items-center justify-center space-x-6 space-x-reverse mb-8">
              <div className="text-center">
                <img
                  src={testimonials[currentSlide].image}
                  alt={testimonials[currentSlide].name}
                  className="w-20 h-20 rounded-full object-cover object-top mx-auto mb-3 border-4 border-blue-300"
                />
                <h4 className="text-lg font-bold">{testimonials[currentSlide].name}</h4>
                <p className="text-blue-200">{testimonials[currentSlide].role}</p>
              </div>
            </div>

            {/* Case Study */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 rounded-2xl p-6">
              <div className="text-center">
                <h5 className="font-semibold text-blue-200 mb-2">האתגר:</h5>
                <p className="text-white">{testimonials[currentSlide].challenge}</p>
              </div>
              <div className="text-center">
                <h5 className="font-semibold text-blue-200 mb-2">התוצאה:</h5>
                <p className="text-white">{testimonials[currentSlide].result}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="ri-arrow-right-line text-2xl"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="ri-arrow-left-line text-2xl"></i>
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 space-x-reverse mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-blue-200 mb-8">לקוחותינו עובדים בחברות המובילות:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {logos.map((logo, index) => (
              <div key={index} className="text-2xl font-bold text-white/70">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
