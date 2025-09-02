import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';

interface SiteSetting {
  id: string;
  section: string;
  key: string;
  value: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url?: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferred_contact: string;
  status: string;
  created_at: string;
}

interface SiteImage {
  id: string;
  section: string;
  key: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('texts');
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'testimonial' | 'image' | 'text'>('testimonial');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['hero']);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load settings
      const settingsResponse = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/site-settings`);
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        setSettings(settingsData);
      }

      // Load testimonials
      const testimonialsResponse = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/testimonials`);
      if (testimonialsResponse.ok) {
        const testimonialsData = await testimonialsResponse.json();
        setTestimonials(testimonialsData);
      }

      // Load contacts
      const contactsResponse = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/contact-submissions`);
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json();
        setContacts(contactsData.data || []);
      }

      // Load images
      const imagesResponse = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/site-images`);
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        setImages(imagesData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (section: string, key: string, value: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/site-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ section, key, value })
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  const saveTestimonial = async (testimonial: Partial<Testimonial>) => {
    try {
      const method = testimonial.id ? 'PUT' : 'POST';
      const url = testimonial.id 
        ? `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/testimonials/${testimonial.id}`
        : `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/testimonials`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testimonial)
      });
      
      if (response.ok) {
        setShowModal(false);
        setEditingItem(null);
        loadData();
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הסיפור הצלחה?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/testimonials/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/contact-submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const saveImage = async (image: Partial<SiteImage>) => {
    try {
      const method = image.id ? 'PUT' : 'POST';
      const url = image.id 
        ? `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/site-images/${image.id}`
        : `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/site-images`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
      });
      
      if (response.ok) {
        setShowModal(false);
        setEditingItem(null);
        loadData();
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את התמונה?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/site-images/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      hero: 'קטע פתיחה',
      services: 'שירותים',
      about: 'אודותינו',
      how_it_works: 'איך זה עובד',
      testimonials: 'סיפורי הצלחה',
      cta: 'קריאה לפעולה',
      contact: 'יצירת קשר',
      navigation: 'תפריט ניווט',
      footer: 'כותרת תחתונה',
      buttons: 'כפתורים ופעולות'
    };
    return titles[section] || section;
  };

  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      title: 'כותרת ראשית',
      subtitle: 'כותרת משנה',
      description: 'תיאור',
      button_text: 'טקסט כפתור ראשי',
      button_secondary: 'טקסט כפתור משני',
      phone: 'טלפון',
      email: 'אימייל',
      address: 'כתובת',
      hours: 'שעות פעילות',
      service1_title: 'שירות 1 - כותרת',
      service1_description: 'שירות 1 - תיאור',
      service2_title: 'שירות 2 - כותרת',
      service2_description: 'שירות 2 - תיאור',
      service3_title: 'שירות 3 - כותרת',
      service3_description: 'שירות 3 - תיאור',
      feature1_title: 'תכונה 1 - כותרת',
      feature1_description: 'תכונה 1 - תיאור',
      feature2_title: 'תכונה 2 - כותרת',
      feature2_description: 'תכונה 2 - תיאור',
      feature3_title: 'תכונה 3 - כותרת',
      feature3_description: 'תכונה 3 - תיאור',
      step1_title: 'שלב 1 - כותרת',
      step1_description: 'שלב 1 - תיאור',
      step2_title: 'שלב 2 - כותרת',
      step2_description: 'שלב 2 - תיאור',
      step3_title: 'שלב 3 - כותרת',
      step3_description: 'שלב 3 - תיאור',
      step4_title: 'שלב 4 - כותרת',
      step4_description: 'שלב 4 - תיאור',
      form_title: 'כותרת טופס',
      form_description: 'תיאור טופס',
      address_title: 'כותרת כתובת',
      phone_title: 'כותרת טלפון',
      email_title: 'כותרת אימייל',
      hours_title: 'כותרת שעות',
      company_description: 'תיאור החברה',
      quick_links_title: 'כותרת קישורים מהירים',
      contact_info_title: 'כותרת פרטי התקשרות',
      social_title: 'כותרת רשתות חברתיות',
      copyright: 'זכויות יוצרים',
      home: 'בית',
      about: 'אודות',
      services: 'שירותים',
      testimonials: 'המלצות',
      contact: 'צור קשר',
      admin: 'ניהול',
      learn_more: 'למד עוד',
      get_started: 'התחל עכשיו',
      contact_us: 'צור קשר',
      read_more: 'קרא עוד',
      view_all: 'צפה בהכל',
      send_message: 'שלח הודעה',
      call_now: 'התקשר עכשיו',
      free_consultation: 'ייעוץ חינם'
    };
    return labels[key] || key;
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const filteredSettings = settings.filter(setting => 
    setting.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getSectionTitle(setting.section).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getFieldLabel(setting.key).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedSettings = filteredSettings.reduce((acc, setting) => {
    if (!acc[setting.section]) acc[setting.section] = [];
    acc[setting.section].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-blue-600 animate-spin mb-4"></i>
          <p>טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900">לוח בקרה למנהל</h1>
            <p className="text-gray-600 mt-2">ניהול תוכן ועריכת האתר</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="flex border-b overflow-x-auto">
              <button
                onClick={() => setActiveTab('texts')}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === 'texts'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                עריכת טקסטים
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === 'images'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                ניהול תמונות
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === 'testimonials'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                סיפורי הצלחה
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === 'contacts'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                פניות לקוחות
              </button>
            </div>
          </div>

          {/* Texts Tab */}
          {activeTab === 'texts' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-900">עריכת טקסטים באתר</h2>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative">
                    <i className="ri-search-line absolute right-3 top-3 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="חפש טקסט או קטע..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                    />
                  </div>
                  <Button onClick={() => {
                    setExpandedSections(Object.keys(groupedSettings));
                  }}>
                    פתח הכל
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    setExpandedSections([]);
                  }}>
                    סגור הכל
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedSettings).map(([section, sectionSettings]) => {
                  const isExpanded = expandedSections.includes(section);
                  return (
                    <div key={section} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(section)}
                        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-right transition-colors"
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {getSectionTitle(section)}
                          </h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                            {sectionSettings.length} טקסטים
                          </span>
                        </div>
                        <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-gray-500`}></i>
                      </button>
                      
                      {isExpanded && (
                        <div className="p-6 bg-white">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {sectionSettings.map((setting) => (
                              <div key={setting.id} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 text-right">
                                  {getFieldLabel(setting.key)}
                                </label>
                                {setting.key.includes('description') || 
                                 setting.key.includes('content') || 
                                 setting.value.length > 100 ? (
                                  <textarea
                                    value={setting.value}
                                    onChange={(e) => updateSetting(setting.section, setting.key, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right resize-none min-h-[120px] transition-colors"
                                    placeholder={`הכנס ${getFieldLabel(setting.key).toLowerCase()}...`}
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={setting.value}
                                    onChange={(e) => updateSetting(setting.section, setting.key, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right transition-colors"
                                    placeholder={`הכנס ${getFieldLabel(setting.key).toLowerCase()}...`}
                                  />
                                )}
                                <div className="text-xs text-gray-500 text-right">
                                  {setting.value.length} תווים
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {Object.keys(groupedSettings).length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-file-text-line text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-500">לא נמצאו טקסטים המתאימים לחיפוש</p>
                </div>
              )}
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-900">ניהול תמונות</h2>
                <Button onClick={() => {
                  setEditingItem({});
                  setModalType('image');
                  setShowModal(true);
                }}>
                  <i className="ri-add-line ml-2"></i>
                  הוסף תמונה חדשה
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(
                  images.reduce((acc, image) => {
                    if (!acc[image.section]) acc[image.section] = [];
                    acc[image.section].push(image);
                    return acc;
                  }, {} as Record<string, SiteImage[]>)
                ).map(([section, sectionImages]) => (
                  <div key={section} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize border-b pb-2">
                      {getSectionTitle(section)}
                    </h3>
                    {sectionImages.map((image) => (
                      <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                          <img
                            src={image.image_url}
                            alt={image.alt_text}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-800 text-right mb-2">
                          {image.key}
                        </p>
                        <p className="text-xs text-gray-600 text-right mb-3">
                          {image.alt_text}
                        </p>
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(image);
                              setModalType('image');
                              setShowModal(true);
                            }}
                            className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded text-sm"
                          >
                            <i className="ri-edit-line ml-1"></i>
                            עריכה
                          </button>
                          <button
                            onClick={() => deleteImage(image.id)}
                            className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded text-sm"
                          >
                            <i className="ri-delete-bin-line ml-1"></i>
                            מחיקה
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-900">סיפורי הצלחה</h2>
                <Button onClick={() => {
                  setEditingItem({});
                  setModalType('testimonial');
                  setShowModal(true);
                }}>
                  <i className="ri-add-line ml-2"></i>
                  הוסף סיפור חדש
                </Button>
              </div>

              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role} - {testimonial.company}</p>
                        <p className="text-gray-700 mt-2">{testimonial.content}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <i key={i} className="ri-star-fill text-yellow-400"></i>
                            ))}
                          </div>
                          {testimonial.is_featured && (
                            <span className="mr-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              מוצג
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => {
                            setEditingItem(testimonial);
                            setModalType('testimonial');
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">פניות לקוחות</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 space-x-reverse mb-2">
                          <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                          <span className="text-sm text-gray-600">{contact.email}</span>
                          {contact.phone && (
                            <span className="text-sm text-gray-600">{contact.phone}</span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            contact.status === 'new' ? 'bg-green-100 text-green-800' :
                            contact.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.status === 'new' ? 'חדש' :
                             contact.status === 'in_progress' ? 'בטיפול' : 'הושלם'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">נושא: {contact.subject}</p>
                        <p className="text-gray-700 mb-2">{contact.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(contact.created_at).toLocaleDateString('he-IL')}
                        </p>
                      </div>
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm pr-8"
                      >
                        <option value="new">חדש</option>
                        <option value="in_progress">בטיפול</option>
                        <option value="completed">הושלם</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showModal && modalType === 'image' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              {editingItem?.id ? 'עריכת תמונה' : 'הוספת תמונה חדשה'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const image = {
                ...editingItem,
                section: formData.get('section') as string,
                key: formData.get('key') as string,
                image_url: formData.get('image_url') as string,
                alt_text: formData.get('alt_text') as string,
                display_order: parseInt(formData.get('display_order') as string) || 0
              };
              saveImage(image);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  קטע באתר
                </label>
                <select
                  name="section"
                  defaultValue={editingItem?.section || 'hero'}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-8"
                >
                  <option value="hero">קטע פתיחה</option>
                  <option value="about">אודותינו</option>
                  <option value="services">שירותים</option>
                  <option value="testimonials">סיפורי הצלחה</option>
                  <option value="gallery">גלריה</option>
                </select>
              </div>
              
              <input
                name="key"
                type="text"
                placeholder="מזהה התמונה (לדוגמה: background_image)"
                defaultValue={editingItem?.key || ''}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
              />
              
              <textarea
                name="image_url"
                placeholder="כתובת התמונה (URL) או תיאור לתמונה חדשה"
                defaultValue={editingItem?.image_url || ''}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right resize-none"
              />
              
              <input
                name="alt_text"
                type="text"
                placeholder="תיאור התמונה (טקסט חלופי)"
                defaultValue={editingItem?.alt_text || ''}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
              />
              
              <input
                name="display_order"
                type="number"
                placeholder="סדר תצוגה"
                defaultValue={editingItem?.display_order || 0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
              />
              
              <div className="flex space-x-4 space-x-reverse">
                <Button type="submit">
                  {editingItem?.id ? 'עדכן' : 'הוסף'}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                  }}
                >
                  ביטול
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showModal && modalType === 'testimonial' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              {editingItem?.id ? 'עריכת סיפור הצלחה' : 'הוספת סיפור הצלחה חדש'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const testimonial = {
                ...editingItem,
                name: formData.get('name') as string,
                role: formData.get('role') as string,
                company: formData.get('company') as string,
                content: formData.get('content') as string,
                rating: parseInt(formData.get('rating') as string),
                is_featured: formData.get('is_featured') === 'on',
                display_order: parseInt(formData.get('display_order') as string) || 0
              };
              saveTestimonial(testimonial);
            }} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="שם"
                defaultValue={editingItem?.name || ''}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="role"
                  type="text"
                  placeholder="תפקיד"
                  defaultValue={editingItem?.role || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                />
                <input
                  name="company"
                  type="text"
                  placeholder="חברה"
                  defaultValue={editingItem?.company || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                />
              </div>
              
              <textarea
                name="content"
                placeholder="תוכן הסיפור"
                defaultValue={editingItem?.content || ''}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right resize-none"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="rating"
                  defaultValue={editingItem?.rating || 5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-8"
                >
                  <option value={5}>5 כוכבים</option>
                  <option value={4}>4 כוכבים</option>
                  <option value={3}>3 כוכבים</option>
                  <option value={2}>2 כוכבים</option>
                  <option value={1}>1 כוכב</option>
                </select>
                
                <input
                  name="display_order"
                  type="number"
                  placeholder="סדר תצוגה"
                  defaultValue={editingItem?.display_order || 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                />
              </div>
              
              <label className="flex items-center justify-end">
                <input
                  name="is_featured"
                  type="checkbox"
                  defaultChecked={editingItem?.is_featured || false}
                  className="ml-2"
                />
                <span>הצג באתר</span>
              </label>
              
              <div className="flex space-x-4 space-x-reverse">
                <Button type="submit">
                  {editingItem?.id ? 'עדכן' : 'הוסף'}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                  }}
                >
                  ביטול
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}