
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import EmergencyButton from '../components/Layout/EmergencyButton';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="page-container">
          <h1 className="text-3xl font-bold text-deepblue mb-6">Mental Health Resources</h1>
          
          <div className="space-y-8">
            {/* Crisis Resources */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-rustred mb-4">
                Crisis Support
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-rustred pl-4">
                  <h3 className="font-medium">988 Suicide & Crisis Lifeline</h3>
                  <p className="text-sm text-deepblue/70 mb-1">
                    Free, 24/7 confidential support for people in distress
                  </p>
                  <div className="flex space-x-3">
                    <a href="tel:988" className="text-sm text-rustred hover:underline">
                      Call 988
                    </a>
                    <a href="sms:988" className="text-sm text-rustred hover:underline">
                      Text 988
                    </a>
                    <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="text-sm text-rustred hover:underline">
                      988lifeline.org
                    </a>
                  </div>
                </div>
                
                <div className="border-l-4 border-rustred pl-4">
                  <h3 className="font-medium">Crisis Text Line</h3>
                  <p className="text-sm text-deepblue/70 mb-1">
                    Text HOME to 741741 to connect with a Crisis Counselor
                  </p>
                  <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="text-sm text-rustred hover:underline">
                    crisistextline.org
                  </a>
                </div>
              </div>
            </section>
            
            {/* General Mental Health */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-harmony mb-4">
                Mental Health Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-harmony pl-4">
                  <h3 className="font-medium">National Institute of Mental Health</h3>
                  <p className="text-sm text-deepblue/70 mb-1">
                    Information on mental disorders and research
                  </p>
                  <a href="https://www.nimh.nih.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-harmony hover:underline">
                    nimh.nih.gov
                  </a>
                </div>
                
                <div className="border-l-4 border-harmony pl-4">
                  <h3 className="font-medium">Mental Health America</h3>
                  <p className="text-sm text-deepblue/70 mb-1">
                    Resources, screening tools, and community support
                  </p>
                  <a href="https://www.mhanational.org" target="_blank" rel="noopener noreferrer" className="text-sm text-harmony hover:underline">
                    mhanational.org
                  </a>
                </div>
                
                <div className="border-l-4 border-harmony pl-4">
                  <h3 className="font-medium">NAMI (National Alliance on Mental Illness)</h3>
                  <p className="text-sm text-deepblue/70 mb-1">
                    Education, support groups, and advocacy
                  </p>
                  <a href="https://www.nami.org" target="_blank" rel="noopener noreferrer" className="text-sm text-harmony hover:underline">
                    nami.org
                  </a>
                </div>
                
                <div className="border-l-4 border-harmony pl-4">
                  <h3 className="font-medium">Psychology Today</h3>
                  <p className="text-sm text-deepblue/70 mb-1">
                    Find therapists, support groups, and treatment centers
                  </p>
                  <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" className="text-sm text-harmony hover:underline">
                    psychologytoday.com
                  </a>
                </div>
              </div>
            </section>
            
            {/* Self-Help */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-deepblue mb-4">
                Self-Help Resources
              </h2>
              
              <ul className="space-y-3">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <div>
                    <a 
                      href="https://www.headspace.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-deepblue hover:text-rustred"
                    >
                      Headspace
                    </a>
                    <p className="text-sm text-deepblue/70">
                      Meditation and mindfulness app with guided sessions
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="mr-2">•</span>
                  <div>
                    <a 
                      href="https://www.calm.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-deepblue hover:text-rustred"
                    >
                      Calm
                    </a>
                    <p className="text-sm text-deepblue/70">
                      Sleep stories, meditation, and relaxation exercises
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="mr-2">•</span>
                  <div>
                    <a 
                      href="https://www.dbtselfhelp.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-deepblue hover:text-rustred"
                    >
                      DBT Self Help
                    </a>
                    <p className="text-sm text-deepblue/70">
                      Dialectical Behavior Therapy skills and resources
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="mr-2">•</span>
                  <div>
                    <a 
                      href="https://www.coursera.org/learn/the-science-of-well-being" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-deepblue hover:text-rustred"
                    >
                      The Science of Well-Being (Yale Course)
                    </a>
                    <p className="text-sm text-deepblue/70">
                      Free online course on improving happiness and building productive habits
                    </p>
                  </div>
                </li>
              </ul>
            </section>
            
            <div className="bg-freshstart/50 rounded-lg p-6 border border-harmony/20">
              <p className="text-sm text-deepblue/80 italic">
                Note: MindMosaic is not a substitute for professional mental health treatment. 
                These resources are provided for informational purposes only. If you're in crisis, 
                please call 988 or visit your local emergency room.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <EmergencyButton />
    </div>
  );
};

export default Resources;
