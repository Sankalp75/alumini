import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { PUNJAB_COLLEGES } from "./colleges";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!config.apiKey) {
  console.log("Missing Firebase env — cannot seed. Set .env.local first.");
  process.exit(0);
}

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

const seedData = [
  { name: "Arjun Sharma", batch: "2021", branch: "CSE", college: "Punjab Engineering College, Chandigarh", company: "Infosys", location: "Bangalore, Karnataka", contact: "9876543210", linkedinUrl: "https://linkedin.com/in/arjun-sharma" },
  { name: "Priya Kaur", batch: "2020", branch: "ECE", college: "Guru Nanak Dev Engineering College, Ludhiana", company: "TCS", location: "Chandigarh, Punjab", contact: "9876543211", linkedinUrl: "https://linkedin.com/in/priya-kaur" },
  { name: "Amanpreet Singh", batch: "2019", branch: "ME", college: "Giani Zail Singh Campus College of Engineering and Technology, Bathinda", company: "Punjab Govt.", location: "Ludhiana, Punjab", contact: "9876543212", linkedinUrl: "https://linkedin.com/in/amanpreet-singh" },
  { name: "Neha Gupta", batch: "2022", branch: "CSE", college: "Giani Zail Singh Campus College of Engineering and Technology, Bathinda", company: "Wipro", location: "Mohali, Punjab", contact: "9876543213", linkedinUrl: "https://linkedin.com/in/neha-gupta" },
  { name: "Rahul Verma", batch: "2018", branch: "CE", college: "Chandigarh College of Engineering and Technology, Chandigarh", company: "HDFC Bank", location: "Patiala, Punjab", contact: "9876543214", linkedinUrl: "https://linkedin.com/in/rahul-verma" },
  { name: "Simran Kaur", batch: "2020", branch: "CSE", college: "Guru Nanak Dev University, Amritsar", company: "Startup", location: "Delhi, Delhi", contact: "9876543215", linkedinUrl: "https://linkedin.com/in/simran-kaur" },
  { name: "Vikram Singh", batch: "2019", branch: "ECE", college: "Dr. B.R. Ambedkar National Institute of Technology, Jalandhar", company: "Infosys", location: "Jalandhar, Punjab", contact: "9876543216", linkedinUrl: "https://linkedin.com/in/vikram-singh" },
  { name: "Ananya Rao", batch: "2021", branch: "EE", college: "Sant Longowal Institute of Engineering and Technology, Sangrur", company: "Higher Studies", location: "Chandigarh, Punjab", contact: "9876543217", linkedinUrl: "https://linkedin.com/in/ananya-rao" },
  { name: "Harpreet Dhaliwal", batch: "2023", branch: "CSE", college: "Indian Institute of Technology Ropar, Rupnagar", company: "TCS", location: "Bangalore, Karnataka", contact: "9876543218", linkedinUrl: "https://linkedin.com/in/harpreet-dhaliwal" },
  { name: "Karan Mehta", batch: "2018", branch: "ME", college: "Beant College of Engineering and Technology, Gurdaspur", company: "Wipro", location: "Ludhiana, Punjab", contact: "9876543219", linkedinUrl: "https://linkedin.com/in/karan-mehta" },
  { name: "Jasleen Kaur", batch: "2022", branch: "IT", college: "University Institute of Engineering and Technology, Panjab University, Chandigarh", company: "Infosys", location: "Mohali, Punjab", contact: "9876543220", linkedinUrl: "https://linkedin.com/in/jasleen-kaur" },
  { name: "Rohan Joshi", batch: "2020", branch: "CSE", college: "Punjabi University, Patiala", company: "HDFC Bank", location: "Patiala, Punjab", contact: "9876543221", linkedinUrl: "https://linkedin.com/in/rohan-joshi" },
  { name: "Meera Patel", batch: "2021", branch: "ECE", college: "Yadavindra College of Engineering, Talwandi Sabo", company: "TCS", location: "Delhi, Delhi", contact: "9876543222", linkedinUrl: "https://linkedin.com/in/meera-patel" },
  { name: "Gurpreet Singh", batch: "2019", branch: "CE", college: "University Institute of Engineering and Technology, Punjabi University, Patiala", company: "Punjab Govt.", location: "Chandigarh, Punjab", contact: "9876543223", linkedinUrl: "https://linkedin.com/in/gurpreet-singh" },
  { name: "Sanya Malhotra", batch: "2023", branch: "CSE", college: "Maharaja Ranjit Singh Punjab Technical University, Bathinda", company: "Startup", location: "Bangalore, Karnataka", contact: "9876543224", linkedinUrl: "https://linkedin.com/in/sanya-malhotra" },
  { name: "Aditya Kumar", batch: "2022", branch: "ECE", college: "Shaheed Bhagat Singh State University, Ferozepur", company: "Wipro", location: "Jalandhar, Punjab", contact: "9876543225", linkedinUrl: "https://linkedin.com/in/aditya-kumar" },
  { name: "Navjot Kaur", batch: "2018", branch: "IT", college: "Guru Nanak Dev University, Amritsar", company: "Infosys", location: "Ludhiana, Punjab", contact: "9876543226", linkedinUrl: "https://linkedin.com/in/navjot-kaur" },
  { name: "Sahil Arora", batch: "2020", branch: "ME", college: "Baba Banda Singh Bahadur Engineering College, Fatehgarh Sahib", company: "Higher Studies", location: "Mohali, Punjab", contact: "9876543227", linkedinUrl: "https://linkedin.com/in/sahil-arora" },
  { name: "Ishita Bansal", batch: "2021", branch: "CSE", college: "Maharaja Ranjit Singh Punjab Technical University, Bathinda", company: "TCS", location: "Chandigarh, Punjab", contact: "9876543228", linkedinUrl: "https://linkedin.com/in/ishita-bansal" },
  { name: "Manpreet Singh", batch: "2023", branch: "EE", college: "Punjab Engineering College, Chandigarh", company: "Punjab Govt.", location: "Patiala, Punjab", contact: "9876543229", linkedinUrl: "https://linkedin.com/in/manpreet-singh-admin", role: "admin" as const },
];

async function seed() {
  const existing = await getDocs(collection(db, "alumni_profiles"));
  if (existing.size >= 15) {
    console.log(`Already ${existing.size} profiles — skipping seed`);
    process.exit(0);
  }
  console.log(`Seeding ${seedData.length} profiles...`);
  for (const s of seedData) {
    const email = `${s.name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
    const password = "Password123";
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      await setDoc(doc(db, "alumni_profiles", uid), {
        uid,
        name: s.name,
        email,
        batch: s.batch,
        branch: s.branch,
        college: s.college,
        collegeOther: "",
        company: s.company,
        location: s.location,
        contact: s.contact,
        linkedinUrl: s.linkedinUrl,
        photoURL: "",
        role: (s as unknown as { role?: string }).role || "alumni",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`+ ${s.name} (${s.branch} ${s.batch} • ${s.college.split(",")[0]}) -> ${email}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("email-already-in-use")) {
        console.log(`= ${s.name} already exists — skip`);
      } else {
        console.error(`x ${s.name}: ${msg}`);
      }
    }
  }
  console.log("Seed done. Admin: manpreet.singh@example.com / Password123");
  process.exit(0);
}
seed();
