

const About = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-5xl font-bold text-slate-800 mb-6">About TaskFlow</h1>
                  <p className="text-xl text-slate-600 mb-8">
                    TaskFlow is a modern, intuitive todo application designed to help you stay organized and productive.
                  </p>
                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Features</h2>
                    <ul className="text-lg text-slate-600 space-y-2">
                      <li>✨ Beautiful drag-and-drop interface</li>
                      <li>🚀 Lightning-fast performance</li>
                      <li>🔒 Secure authentication</li>
                      <li>📱 Responsive design</li>
                      <li>🎨 Modern animations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

export default About;