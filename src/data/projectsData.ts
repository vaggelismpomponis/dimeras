export interface ProjectPhoto {
  src: string;
  type: "before" | "after";
  title: string;
  desc: string;
}

export interface BeforeAfterPair {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface Project {
  id: number;
  slug: string;
  category: "Ανακαινίσεις" | "Νέες Κατασκευές" | "Τεχνικά Έργα";
  title: string;
  subtitle: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  hasBeforeAfter: boolean;
  featured?: boolean;
  beforeAfter?: BeforeAfterPair;
  image?: string; // fallback single image
  gallery: ProjectPhoto[];
  tags: string[];
}

export const projectCategories = [
  "Όλα",
  "Πριν & Μετά",
  "Ανακαινίσεις",
  "Νέες Κατασκευές",
  "Τεχνικά Έργα",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const statusFilters = [
  { id: "all", label: "Όλα τα Έργα" },
  { id: "before-after", label: "Πριν & Μετά (Before / After)" },
  { id: "after", label: "Ολοκληρωμένα (Μετά)" },
  { id: "before", label: "Αρχική Κατάσταση (Πριν)" },
] as const;

export type StatusFilterId = (typeof statusFilters)[number]["id"];

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "deca-urban-living-asklipiou",
    category: "Ανακαινίσεις",
    title: "Deca Urban Living",
    subtitle: "Ριζική Ανακαίνιση & Ανακατασκευή Κτιρίου σε Boutique Μονάδα 4 Κλειδιών",
    location: "Ασκληπιού 32, Κέντρο Λάρισας",
    year: "2024",
    scope: "Αρχιτεκτονική αναβάθμιση όψης, κατακόρυφες περσίδες, κρυφός φωτισμός LED, πολυτελείς σουίτες & en-suite λουτρά.",
    description:
      "Ολοκληρωμένη μετατροπή και ριζική ανακαίνιση υφιστάμενου πολυώροφου κτιρίου στο κέντρο της Λάρισας σε σύγχρονη boutique μονάδα επιπλωμένων διαμερισμάτων 4 κλειδιών (Deca Urban Living). Το έργο περιέλαβε ριζική ανακατασκευή της εξωτερικής πρόσοψης με ειδικές κατακόρυφες αρχιτεκτονικές περσίδες και προηγμένο νυχτερινό φωτισμό LED, πλήρη αναδιαμόρφωση των εσωτερικών χώρων σε αυτόνομες σουίτες υψηλών προδιαγραφών, μοντέρνα λουτρά με terrazzo πλακίδια, κουζινάκια και σύγχρονα συστήματα κλιματισμού.",
    hasBeforeAfter: true,
    featured: true,
    beforeAfter: {
      before: "/images/projects/deca-urban-living/before-facade-corner.jpg",
      after: "/images/projects/deca-urban-living/after-facade-night-corner.jpg",
      beforeLabel: "ΠΡΙΝ • Ασκληπιού 32",
      afterLabel: "ΜΕΤΑ • Deca Urban Living",
    },
    image: "/images/projects/deca-urban-living/after-facade-night-corner.jpg",
    tags: ["Boutique Hotel", "Ανακαίνιση Πρόσοψης", "Αρχιτεκτονικός Φωτισμός", "Σουίτες 4 Κλειδιά", "Κέντρο Λάρισας"],
    gallery: [
      {
        src: "/images/projects/deca-urban-living/after-facade-night-corner.jpg",
        type: "after",
        title: "Κεντρική Νυχτερινή Όψη Πρόσοψης",
        desc: "Ολοκληρωμένη πρόσοψη με αρχιτεκτονικές περσίδες, φωτισμό ανάδειξης και φωτιζόμενη επιγραφή Deca Urban Living.",
      },
      {
        src: "/images/projects/deca-urban-living/before-facade-corner.jpg",
        type: "before",
        title: "Εξωτερική Όψη Κτιρίου (Πριν την Ανακαίνιση)",
        desc: "Η αρχική κατάσταση του κτιρίου στην οδό Ασκληπιού 32 πριν από τις επεμβάσεις της DN GROUP.",
      },
      {
        src: "/images/projects/deca-urban-living/after-facade-night-detail.jpg",
        type: "after",
        title: "Αρχιτεκτονική Λεπτομέρεια & Φωτισμός",
        desc: "Κάθετες σχεδιαστικές γραμμές με θερμό αρχιτεκτονικό φωτισμό και ανάγλυφο λογότυπο Deca Urban Living.",
      },
      {
        src: "/images/projects/deca-urban-living/before-facade-street.jpg",
        type: "before",
        title: "Πρόσοψη από το Δρόμο (Πριν)",
        desc: "Παλαιά κουφώματα, φθορές τοιχοποιίας και παλιά κιγκλιδώματα προ της έναρξης των εργασιών.",
      },
      {
        src: "/images/projects/deca-urban-living/after-suite-bedroom.jpg",
        type: "after",
        title: "Master Σουίτα & En-Suite Λουτρό",
        desc: "Πολυτελές υπνοδωμάτιο με king-size κρεβάτι και θέαση στο μοντέρνο λουτρό με terrazzo πλακίδια.",
      },
      {
        src: "/images/projects/deca-urban-living/after-suite-kitchenette.jpg",
        type: "after",
        title: "Kitchenette & Χώρος Καθιστικού",
        desc: "Εντοιχιζόμενη σύγχρονη κουζίνα με minimal γραμμές, γραμμικό φωτισμό και άνετο καναπέ-κρεβάτι.",
      },
      {
        src: "/images/projects/deca-urban-living/after-suite-living.jpg",
        type: "after",
        title: "Σαλόνι & Εσωτερική Διαμόρφωση",
        desc: "Υψηλή αισθητική επίπλωσης, δρύινα δάπεδα, κλιματισμός και minimal διακοσμητικά στοιχεία.",
      },
    ],
  },
  {
    id: 2,
    slug: "ipeirou-apartment-renovation",
    category: "Ανακαινίσεις",
    title: "Ολική Ανακαίνιση Διαμερίσματος",
    subtitle: "Ριζική Ανακατασκευή, Νέες Εγκαταστάσεις & Ενεργειακή Αναβάθμιση",
    location: "Οδός Ηπείρου, Λάρισα",
    year: "2024",
    scope: "Καθαιρέσεις, νέα υδραυλικά & ηλεκτρολογικά δίκτυα, ενεργειακά κουφώματα PVC, νέα κουζίνα, πολυτελές μπάνιο, ντουλάπες & θωρακισμένη πόρτα.",
    description:
      "Πλήρης ριζική ανακαίνιση οικιστικού διαμερίσματος στην οδό Ηπείρου στη Λάρισα. Πραγματοποιήθηκε ολική αποξήλωση των παλαιών εγκαταστάσεων, τοιχοποιιών και φθαρμένων δαπέδων. Κατασκευάστηκαν εξ αρχής νέα υδραυλικά και ηλεκτρολογικά δίκτυα. Τοποθετήθηκαν νέα ενεργειακά συνθετικά κουφώματα PVC με διπλά κρύσταλλα, νέα εργονομική γωνιακή κουζίνα με δρύινα ντουλάπια και μαρμάρινη πλάτη, πολυτελές λουτρό με walk-in ντουζιέρα και κρύσταλλο ασφαλείας, εντοιχιζόμενες ντουλάπες οροφής, ενιαία δάπεδα υψηλής αντοχής και θωρακισμένη πόρτα εισόδου.",
    hasBeforeAfter: true,
    featured: true,
    beforeAfter: {
      before: "/images/projects/ipeirou-apartment/before-kitchen.jpg",
      after: "/images/projects/ipeirou-apartment/after-kitchen-front.jpg",
      beforeLabel: "ΠΡΙΝ • Παλαιά Κουζίνα",
      afterLabel: "ΜΕΤΑ • Νέα Σύγχρονη Κουζίνα",
    },
    image: "/images/projects/ipeirou-apartment/after-kitchen-front.jpg",
    tags: ["Ολική Ανακαίνιση", "Νέα Κουζίνα", "Πολυτελές Μπάνιο", "Κουφώματα PVC", "Ηλεκτρομηχανολογικά", "Λάρισα"],
    gallery: [
      {
        src: "/images/projects/ipeirou-apartment/after-kitchen-front.jpg",
        type: "after",
        title: "Νέα Σύγχρονη Κουζίνα (Μετά)",
        desc: "Εργονομικός σχεδιασμός με δρύινα πορτάκια, μαρμάρινη επένδυση τοίχου και ανοξείδωτο διπλό νεροχύτη.",
      },
      {
        src: "/images/projects/ipeirou-apartment/before-kitchen.jpg",
        type: "before",
        title: "Παλαιά Κουζίνα (Πριν)",
        desc: "Η αρχική κατάσταση της κουζίνας με παλαιά κεραμικά πλακάκια, αποξηλωμένες σωληνώσεις και φθορές.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-kitchen-wide.jpg",
        type: "after",
        title: "Ευρυγώνια Άποψη Κουζίνας & Δαπέδου",
        desc: "Συνδυασμός νέων επίπλων κουζίνας με γυαλιστερό δάπεδο όψης φυσικού ξύλου.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-kitchen-detail.jpg",
        type: "after",
        title: "Λεπτομέρεια Ντουλαπιών & Μηχανισμών",
        desc: "Υψηλής ποιότητας μηχανισμοί soft-close και ενσωματωμένος απορροφητήρας.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-bathroom-full.jpg",
        type: "after",
        title: "Ολοκληρωμένο Νέο Μπάνιο (Μετά)",
        desc: "Πλήρης ανακαίνιση λουτρού με λευκά μαρμάρινα πλακίδια, κρεμαστή λεκάνη, έπιπλο νιπτήρα και πετσετοκρεμάστρα.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-bathroom-shower.jpg",
        type: "after",
        title: "Walk-in Ντουζιέρα με Κρύσταλλο Ασφαλείας",
        desc: "Ελεύθερη είσοδος ντουζιέρας με διάφανο κρύσταλλο, εντοιχιζόμενη μπαταρία και ανοξείδωτο ράφι.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-bathroom-vanity.jpg",
        type: "after",
        title: "Έπιπλο Νιπτήρα & Ντουλάπι Καθρέπτη",
        desc: "Κρεμαστό ξύλινο έπιπλο με κεραμικό νιπτήρα και αποθηκευτικό καθρέπτη με φωτισμό.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-bathroom-detail.jpg",
        type: "after",
        title: "Λεπτομέρεια Επενδύσεων Μπάνιου",
        desc: "Άψογη εφαρμογή μαρμαροπλακιδίων μεγάλων διαστάσεων και υδρομονωτική προστασία.",
      },
      {
        src: "/images/projects/ipeirou-apartment/before-balcony-conduits.jpg",
        type: "before",
        title: "Μπαλκονόπορτα & Κανάλια Εγκαταστάσεων (Πριν)",
        desc: "Αποξήλωση παλαιών κουφωμάτων και διάνοιξη καναλιών για σωληνώσεις θέρμανσης και ηλεκτρικά.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-balcony-door.jpg",
        type: "after",
        title: "Νέα Ενεργειακά Κουφώματα PVC (Μετά)",
        desc: "Θερμομονωτικά συνθετικά κουφώματα με διπλούς ενεργειακούς υαλοπίνακες, νέο σώμα καλοριφέρ και ανακαινισμένο δάπεδο.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-balcony-exterior.jpg",
        type: "after",
        title: "Εξωτερικός Εξώστης & Θέα",
        desc: "Νέα πλακόστρωση εξώστη, βαφές και συντήρηση κιγκλιδωμάτων.",
      },
      {
        src: "/images/projects/ipeirou-apartment/before-room-demolition.jpg",
        type: "before",
        title: "Καθαιρέσεις Τοιχοποιίας & Αποξηλώσεις (Πριν)",
        desc: "Απομάκρυνση παλαιών μεσοτοιχιών για τη λειτουργική ενοποίηση και αναδιαμόρφωση των χώρων.",
      },
      {
        src: "/images/projects/ipeirou-apartment/before-plumbing-rough.jpg",
        type: "before",
        title: "Προετοιμασία Υδραυλικών Δικτύων (Πριν)",
        desc: "Αντικατάσταση παλαιών σωληνώσεων ύδρευσης & αποχέτευσης με σύγχρονα υλικά πολυστρωματικών σωλήνων.",
      },
      {
        src: "/images/projects/ipeirou-apartment/before-electrical-wiring.jpg",
        type: "before",
        title: "Νέες Ηλεκτρολογικές Οδεύσεις (Πριν)",
        desc: "Έγχρωμοι σωλήνες καλωδιώσεων στο δάπεδο για πλήρη ηλεκτρολογική αναβάθμιση και αυτονομία κυκλωμάτων.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-wardrobe-main.jpg",
        type: "after",
        title: "Εντοιχιζόμενη Custom Ντουλάπα Υπνοδωματίου (Μετά)",
        desc: "Τρίφυλλη ντουλάπα πλήρους ύψους οροφής με πατάρια και ανοξείδωτες λαβές σε φυσικό χρώμα ξύλου.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-wardrobe-room.jpg",
        type: "after",
        title: "Υπνοδωμάτιο & Εσωτερική Πόρτα (Μετά)",
        desc: "Πλήρως ανακαινισμένο δωμάτιο με νέα εσωτερική πόρτα, ενιαίο δάπεδο και σοβατεπί.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-security-door.jpg",
        type: "after",
        title: "Θωρακισμένη Πόρτα Ασφαλείας Εισόδου (Μετά)",
        desc: "Νέα πόρτα ασφαλείας με ξύλινη επένδυση, περιμετρικά κλειδώματα και satin chrome αξεσουάρ.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-entrance-hall.jpg",
        type: "after",
        title: "Χώρος Υποδοχής & Εισόδου (Μετά)",
        desc: "Φωτεινός διάδρομος εισόδου με σπατουλαριστούς τοίχους και νέο ηλεκτρολογικό πίνακα.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-entrance-view.jpg",
        type: "after",
        title: "Άποψη από το Χολ προς το Εσωτερικό",
        desc: "Αρμονική ροή χώρων με ομοιόμορφο φωτισμό και ποιοτικά υλικά φινιρίσματος.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-corridor.jpg",
        type: "after",
        title: "Κεντρικός Διάδρομος Κατοικίας",
        desc: "Νέες πόρτες δωματίων και ενιαία επίστρωση δαπέδου χωρίς ανισοσταθμίες.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-interior-doors.jpg",
        type: "after",
        title: "Νέες Εσωτερικές Θύρες",
        desc: "Μοντέρνες laminate πόρτες με μαγνητικές κλειδαριές και ηχομονωτικά λάστιχα.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-room-angle.jpg",
        type: "after",
        title: "Γωνιακή Λεπτομέρεια Δωματίου",
        desc: "Καθαρές γεωμετρικές γραμμές, άψογη βαφή και ποιοτικό σοβατεπί.",
      },
      {
        src: "/images/projects/ipeirou-apartment/after-living-area.jpg",
        type: "after",
        title: "Ανακαινισμένος Χώρος Διημέρευσης",
        desc: "Φωτεινό και λειτουργικό διαμέρισμα έτοιμο προς κατοίκηση.",
      },
    ],
  },
  {
    id: 3,
    slug: "neodmiti-katoikia-larissa",
    category: "Νέες Κατασκευές",
    title: "Νεόδμητη Μονοκατοικία",
    subtitle: "Ολοκληρωμένη Κατασκευή από τα Θεμέλια έως το Κλειδί",
    location: "Λάρισα",
    year: "2023",
    scope: "Στατική μελέτη, εκσκαφές, σκυροδέτηση, θερμοπρόσοψη, εσωτερικές διαρρυθμίσεις & περιβάλλων χώρος.",
    description:
      "Ολοκληρωμένη κατασκευή διώροφης σύγχρονης κατοικίας υψηλής ενεργειακής κλάσης Α+. Πλήρης διαχείριση και συντονισμός όλων των σταδίων: από τη θεμελίωση, τον φέροντα οργανισμό οπλισμένου σκυροδέματος, την εξωτερική θερμοπρόσοψη και τα ενεργειακά συστήματα, μέχρι τις τελικές επενδύσεις και τη διαμόρφωση του αύλειου χώρου.",
    hasBeforeAfter: false,
    featured: false,
    tags: ["Νέα Κατασκευή", "Ενεργειακή Κλάση Α+", "Μονοκατοικία", "Οπλισμένο Σκυρόδεμα", "Λάρισα"],
    gallery: [],
  },
  {
    id: 4,
    slug: "polykatoikia-larissa",
    category: "Νέες Κατασκευές",
    title: "Πολυκατοικία 8 Διαμερισμάτων",
    subtitle: "Ανέγερση Πολυώροφου Κτιρίου Κατοικιών",
    location: "Λάρισα",
    year: "2022",
    scope: "Κατασκευή φέροντος οργανισμού, τοιχοποιίες, ηλεκτρομηχανολογικές υποδομές, ανελκυστήρας & κοινόχρηστοι χώροι.",
    description:
      "Ανέγερση σύγχρονης πολυκατοικίας 8 ανεξάρτητων διαμερισμάτων με υπόγειο χώρο στάθμευσης και αποθήκες. Αυστηρή τήρηση του χρονοδιαγράμματος, πιστοποιημένα υλικά υψηλής αντοχής και πλήρης επίβλεψη από την ομάδα της DN GROUP.",
    hasBeforeAfter: false,
    featured: false,
    tags: ["Πολυκατοικία", "Νέα Κτίρια", "Στατική Επάρκεια", "Θεσσαλία"],
    gallery: [],
  },
  {
    id: 5,
    slug: "anakainisi-sxolikis-monadas",
    category: "Τεχνικά Έργα",
    title: "Ανακαίνιση Σχολικής Μονάδας",
    subtitle: "Συμμετοχή στο Πρόγραμμα «Μαριέττα Γιαννάκου»",
    location: "Λάρισα",
    year: "2023",
    scope: "Ενεργειακή & κτιριακή αναβάθμιση σχολικών αιθουσών, υγρομονώσεις δωμάτων, ανακαίνιση χώρων υγιεινής & αύλειων χώρων.",
    description:
      "Εκτέλεση εργασιών συντήρησης και αποκατάστασης σχολικών υποδομών στο πλαίσιο του προγράμματος «Μαριέττα Γιαννάκου». Επισκευές μονώσεων, χρωματισμοί, ανακατασκευή WC και βελτίωση προσβασιμότητας για ασφαλές και σύγχρονο εκπαιδευτικό περιβάλλον.",
    hasBeforeAfter: false,
    featured: false,
    tags: ["Δημόσια Έργα", "Σχολικά Κτίρια", "Μαριέττα Γιαννάκου", "Μονώσεις", "Λάρισα"],
    gallery: [],
  },
  {
    id: 6,
    slug: "apokatastasi-dimosiou-ktiriou",
    category: "Τεχνικά Έργα",
    title: "Αποκατάσταση Δημόσιου Κτιρίου",
    subtitle: "Επισκευές, Ενισχύσεις & Στεγανοποιήσεις",
    location: "Θεσσαλία",
    year: "2022",
    scope: "Δομικές αποκαταστάσεις, στεγανοποιήσεις, εξωτερικοί χρωματισμοί και αντικατάσταση τεχνικών στοιχείων.",
    description:
      "Εκτεταμένες τεχνικές επισκευές και αποκατάσταση κτιριακού συγκροτήματος στη Θεσσαλία. Ειδικές εργασίες επισκευής σκυροδέματος, στεγανοποίησης δωμάτων και πλήρους ανακαίνισης όψεων με υλικά υψηλής αντοχής σε καιρικές συνθήκες.",
    hasBeforeAfter: false,
    featured: false,
    tags: ["Τεχνικά Έργα", "Αποκαταστάσεις", "Επισκευές Σκυροδέματος", "Θεσσαλία"],
    gallery: [],
  },
];

