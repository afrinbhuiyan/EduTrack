export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our products, pricing, 
          or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      {/* Divider */}
      <div className="px-6">
        <div className="border-t border-gray-200"></div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">You have a blog! Please do not find before.</p>
            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name:
                </label>
                <div className="mt-1 px-4 py-3 border border-gray-300 rounded-md bg-gray-50">
                  John Cox
                </div>
              </div>

              {/* Name in regards Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name in regards:
                </label>
                <div className="mt-1 px-4 py-3 border border-gray-300 rounded-md bg-gray-50">
                  Vice Bank
                </div>
              </div>

              {/* Email in regards Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email in regards:
                </label>
                <a 
                  href="https://www.vicebank.com" 
                  className="mt-1 px-4 py-3 border border-gray-300 rounded-md bg-blue-50 text-blue-600 block hover:bg-blue-100"
                >
                  John.douglasses@vice.com
                </a>
              </div>

              {/* Subject in regards Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject in regards:
                </label>
                <a 
                  href="https://manage.wordpress.com" 
                  className="mt-1 px-4 py-3 border border-gray-300 rounded-md bg-blue-50 text-blue-600 block hover:bg-blue-100"
                >
                  Manage
                </a>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message in regards:
                </label>
                <div className="mt-1 px-4 py-12 border border-gray-300 rounded-md bg-gray-50">
                  {/* Empty message box */}
                </div>
              </div>

              {/* Attachment Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (optional)
                </label>
                <div className="mt-1 px-4 py-8 border border-gray-300 rounded-md bg-gray-50 border-dashed">
                  {/* Empty attachment box */}
                </div>
              </div>

              <div className="pt-4">
                <div className="h-1 w-12 bg-gray-300"></div>
              </div>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach Out</h2>
            <p className="text-gray-600 mb-8">Find us and contact through our channels.</p>
            
            <div className="space-y-6">
              {/* Email */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email:</h3>
                <p className="text-gray-700">support@yourcompany.com</p>
              </div>

              {/* Phone */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone:</h3>
                <p className="text-gray-700">+11 981 123 - 6827</p>
              </div>

              {/* Address */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office Address:</h3>
                <p className="text-gray-700">023 Phone Now, Suite 405, Metropolis, CA 96720</p>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Saturday - 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-700">Sunday: Count</p>
                </div>
              </div>
            </div>

            {/* Connect With Us Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
              <div className="h-1 w-12 bg-gray-300"></div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-8">
                {/* FAQ 1 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    What information do I need to provide in the contact form?
                  </h3>
                  <p className="text-gray-600">
                    Please include your informer, email address, a clear table in the surrounding your laptop, 
                    such a chatbot message describing your needs. You can also attach content files to help 
                    us understand your request score.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    How long does it take to get a response?
                  </h3>
                  <p className="text-gray-600">
                    We drive to requests in all queries within 24-dll business hours. For upper matter, 
                    please consider calling our request line during business hour for a letter requests.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    Can I attach multiple files?
                  </h3>
                  <div className="h-4 w-24 bg-gray-200"></div>
                </div>

                {/* FAQ 4 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    Who are you business hours?
                  </h3>
                  <div className="h-4 w-32 bg-gray-200"></div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-12 p-6 border-l-4 border-blue-500 bg-blue-50">
                <p className="text-gray-700 italic">
                  "Reaching out was incredibly easy, and the team provided quick, helpful assistance. 
                  Truly exceptional support™"
                </p>
                <p className="mt-4 font-semibold text-gray-900">— John P., Sisters Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}