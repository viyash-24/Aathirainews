import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AathiraiNews",
  description: "Privacy Policy for AathiraiNews",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-background text-on-background">
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-['Work_Sans'] text-[28px] sm:text-[36px] md:text-[48px] leading-[36px] sm:leading-[44px] md:leading-[56px] tracking-[-0.02em] font-bold text-primary mb-8 sm:mb-12">
            தனியுரிமைக் கொள்கை (Privacy Policy)
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none font-[Mukta_Malar]">
            <p className="mb-6 text-tertiary text-lg font-medium leading-[28px]">
              ஆதிரை செய்திகள் (Aadhirai News) இணையதளத்திற்கு உங்களை அன்போடு வரவேற்கிறோம். எங்கள் தளத்தைப் பயன்படுத்தும் வாசகர்களின் தனியுரிமையைப் பாதுகாப்பதில் நாங்கள் முழு அர்ப்பணிப்புடன் செயல்படுகிறோம். எங்கள் இணையதளத்தை நீங்கள் பயன்படுத்தும் போது, உங்களின் எந்தவொரு தகவலும் எவ்வாறு சேகரிக்கப்படுகிறது மற்றும் பாதுகாக்கப்படுகிறது என்பதை இந்தத் தனியுரிமைக் கொள்கை விளக்குகிறது.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">1. நாம் சேகரிக்கும் தகவல்கள் (Information We Collect)</h2>
            <p className="mb-4">நீங்கள் எங்கள் இணையதளத்தை அணுகும்போது, பின்வரும் பொதுவான தகவல்கள் தானியங்கி முறையில் சேகரிக்கப்படலாம்:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-tertiary">
              <li><strong>கருத்துகள் (Comments):</strong> செய்திகளுக்குக் கீழே நீங்கள் கருத்துகளைப் பதிவிடும்போது, நீங்கள் வழங்கும் பெயர் மற்றும் மின்னஞ்சல் முகவரி.</li>
              <li><strong>பயன்பாட்டுத் தரவு (Log Data):</strong> நீங்கள் பயன்படுத்தும் பிரவுசர் வகை, ஐபி முகவரி (IP Address), மற்றும் எங்கள் தளத்தில் நீங்கள் பார்வையிட்ட பக்கங்கள்.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">2. தகவல்களைப் பயன்படுத்தும் முறை (How We Use Your Information)</h2>
            <p className="mb-4">நாங்கள் சேகரிக்கும் தகவல்களைப் பின்வரும் நோக்கங்களுக்காக மட்டுமே பயன்படுத்துகிறோம்:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-tertiary">
              <li>இணையதளத்தின் சேவைகளை மேம்படுத்துவதற்கும், வாசகர்களின் அனுபவத்தை நல்வழிப்படுத்துவதற்கும்.</li>
              <li>வாசகர்களின் சந்தேகங்கள் அல்லது கருத்துகளுக்குப் பதிலளிப்பதற்கு.</li>
              <li>தளத்தின் பாதுகாப்பை உறுதி செய்வதற்கு.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">3. குக்கீகள் பயன்பாடு (Cookies Policy)</h2>
            <p className="mb-6 text-tertiary">
              எங்கள் இணையதளத்தில் வாசகர்களின் தேவைகளை அறிந்துகொள்ளவும், சிறந்த பயனர் அனுபவத்தை வழங்கவும் 'குக்கீகள்' (Cookies) பயன்படுத்தப்படலாம். நீங்கள் விரும்பினால், உங்கள் பிரவுசர் அமைப்புகளில் (Browser Settings) குக்கீகளை முடக்கி வைக்கலாம்.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">4. விளம்பரங்கள் மற்றும் மூன்றாம் தரப்பு இணைப்புகள் (Third-Party Ads & Links)</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-tertiary">
              <li>எங்கள் தளத்தில் கூகுள் (Google AdSense) போன்ற மூன்றாம் தரப்பு விளம்பர நிறுவனங்கள் விளம்பரங்களைக் காண்பிக்க குக்கீகளைப் பயன்படுத்தலாம்.</li>
              <li>எங்கள் செய்திகளில் பிற இணையதளங்களின் இணைப்புகள் (Links) இருக்கலாம். அந்தத் தளங்களின் தனியுரிமைக் கொள்கைகளுக்கு ஆதிரை செய்திகள் பொறுப்பாகாது.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">5. தரவுப் பாதுகாப்பு (Data Security)</h2>
            <p className="mb-6 text-tertiary">
              வாசகர்களின் தனிப்பட்ட விவரங்களை நாங்கள் எந்தவொரு வணிக நோக்கத்திற்காகவும் பிற நிறுவனங்களுக்கு விற்பனையோ அல்லது பகிர்வோ செய்வதில்லை. உங்கள் தரவுகள் பாதுகாப்பாக இருப்பதை உறுதி செய்ய முறையான தொழில்நுட்ப நடவடிக்கைகள் எடுக்கப்பட்டுள்ளன.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">6. இந்தத் தனியுரிமைக் கொள்கையில் மாற்றங்கள் (Changes to this Privacy Policy)</h2>
            <p className="mb-6 text-tertiary">
              ஆதிரை செய்திகள் தளம், இந்தத் தனியுரிமைக் கொள்கையை எப்போது வேண்டுமானாலும் மாற்றி அமைக்கும் உரிமையைக் கொண்டுள்ளது. மாற்றங்கள் செய்யப்படும் பட்சத்தில், அவை இந்தப் பக்கத்தில் உடனடியாகப் புதுப்பிக்கப்படும்.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-primary font-['Work_Sans']">எங்களைத் தொடர்புகொள்ள (Contact Us)</h2>
            <p className="mb-6 text-tertiary">
              இந்தத் தனியுரிமைக் கொள்கை குறித்து ஏதேனும் கேள்விகள் இருந்தால், எங்களது அதிகாரப்பூர்வ மின்னஞ்சல் முகவரி அல்லது தொடர்புப் பக்கம் (Contact Us) வழியாக எங்களைத் தொடர்புகொள்ளலாம்.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
