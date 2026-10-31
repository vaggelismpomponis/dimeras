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

export type ProjectCategoryName =
  | "Ανακαινίσεις Κατοικιών"
  | "Ανακαινίσεις Επενδυτικών Ακινήτων"
  | "Νέες Κατασκευές"
  | "Τεχνικά Έργα";

export interface Project {
  id: number;
  slug: string;
  category: ProjectCategoryName;
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
  "Ανακαινίσεις Κατοικιών",
  "Ανακαινίσεις Επενδυτικών Ακινήτων",
  "Νέες Κατασκευές",
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
    category: "Ανακαινίσεις Επενδυτικών Ακινήτων",
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
    category: "Ανακαινίσεις Κατοικιών",
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
        src: "/images/projects/ipeirou-apartment/after-interior-doors.jpg",
        type: "after",
        title: "Νέες Εσωτερικές Θύρες",
        desc: "Μοντέρνες laminate πόρτες με μαγνητικές κλειδαριές και ηχομονωτικά λάστιχα.",
      },
    ],
  },
  {
    id: 3,
    slug: "neodmiti-katoikia-falani-larissa",
    category: "Νέες Κατασκευές",
    title: "Νεόδμητη Κατοικία στη Φαλάνη",
    subtitle: "Ανέγερση από τα Θεμέλια • Φέρων Οργανισμός, Τοιχοποιίες & Επιχρίσματα",
    location: "Φαλάνη, Λάρισα",
    year: "2024",
    scope: "Εκσκαφές, οπλισμοί θεμελίωσης, σκυροδέτηση τοιχίων & φέροντος οργανισμού, τοιχοποιίες, υγρομονώσεις & επιχρίσματα.",
    description:
      "Ολοκληρωμένη ανέγερση σύγχρονης κατοικίας στη Φαλάνη Λάρισας από την DN GROUP. Πλήρης διαχείριση και συντονισμός όλων των κατασκευαστικών σταδίων: από τη χάραξη, την εκσκαφή του σκάμματος και την τοποθέτηση των χαλύβδινων οπλισμών θεμελίωσης, τη σκυροδέτηση των περιμετρικών τοιχίων, μέχρι την κατασκευή του φέροντος οργανισμού οπλισμένου σκυροδέματος, τις περιμετρικές οπτοπλινθοδομές, τη στεγανοποίηση στάθμης εδάφους και τα εσωτερικά επιχρίσματα.",
    hasBeforeAfter: true,
    featured: false,
    beforeAfter: {
      before: "/images/projects/falani-residence/before-foundation-concrete-walls.jpg",
      after: "/images/projects/falani-residence/after-brickwork-facade.jpg",
      beforeLabel: "ΠΡΙΝ • Θεμελίωση & Τοιχία",
      afterLabel: "ΜΕΤΑ • Φέρων Οργανισμός & Τοιχοποιία",
    },
    image: "/images/projects/falani-residence/after-brickwork-facade.jpg",
    tags: ["Νέα Κατασκευή", "Μονοκατοικία", "Οπλισμένο Σκυρόδεμα", "Τοιχοποιίες", "Υγρομονώσεις", "Φαλάνη", "Λάρισα"],
    gallery: [
      {
        src: "/images/projects/falani-residence/after-brickwork-facade.jpg",
        type: "after",
        title: "Ολοκλήρωση Σκελετού & Τοιχοποιίας (Μετά)",
        desc: "Φέρων οργανισμός οπλισμένου σκυροδέματος, οπτοπλινθοδομές ακριβείας και υγρομόνωση στάθμης εδάφους.",
      },
      {
        src: "/images/projects/falani-residence/before-foundation-concrete-walls.jpg",
        type: "before",
        title: "Σκυροδέτηση Τοιχίων Θεμελίωσης (Πριν)",
        desc: "Ολοκλήρωση έγχυσης σκυροδέματος περιμετρικών τοιχίων βάσης και αναμονές υποστυλωμάτων.",
      },
      {
        src: "/images/projects/falani-residence/after-brickwork-waterproofing.jpg",
        type: "after",
        title: "Περιμετρική Όψη & Στεγανοποίηση Βάσης (Μετά)",
        desc: "Τοποθέτηση προστατευτικής μεμβράνης αποστράγγισης (αυγοθήκη) και μόνωση θεμελίων.",
      },
      {
        src: "/images/projects/falani-residence/before-foundation-excavation.jpg",
        type: "before",
        title: "Εκσκαφή & Οπλισμοί Θεμελίωσης (Πριν)",
        desc: "Διαμόρφωση σκάμματος θεμελίωσης και τοποθέτηση πλεγμάτων και κλωβών σιδηροπλισμού.",
      },
      {
        src: "/images/projects/falani-residence/after-interior-plastering-room.jpg",
        type: "after",
        title: "Εσωτερικά Επιχρίσματα Χώρων (Μετά)",
        desc: "Εφαρμογή σοβάδων σε τοιχοποιίες και οροφές, ανοίγματα κουφωμάτων και καθαρισμός χώρου.",
      },
      {
        src: "/images/projects/falani-residence/before-foundation-steel-cage.jpg",
        type: "before",
        title: "Πλέγμα Σιδηροπλισμού & Υποστυλώματα (Πριν)",
        desc: "Πλήρης δικτύωση οπλισμού κοιτόστρωσης και τοποθέτηση συνδετήρων υποστυλωμάτων.",
      },
      {
        src: "/images/projects/falani-residence/after-interior-plastering-corridor.jpg",
        type: "after",
        title: "Διάδρομος & Ηλεκτρολογικές Εγκαταστάσεις (Μετά)",
        desc: "Διαμορφωμένος εσωτερικός διάδρομος με κανάλια καλωδιώσεων, υαλοπλέγματα ενίσχυσης και επιχρίσματα.",
      },
      {
        src: "/images/projects/falani-residence/before-foundation-wide.jpg",
        type: "before",
        title: "Γενική Άποψη Έργου Θεμελίωσης (Πριν)",
        desc: "Άποψη του οικοπέδου στη Φαλάνη κατά τη φάση τοποθέτησης των χαλύβδινων οπλισμών.",
      },
      {
        src: "/images/projects/falani-residence/before-foundation-rebar-detail.jpg",
        type: "before",
        title: "Λεπτομέρεια Οπλισμών Πεδιλοδοκών (Πριν)",
        desc: "Αυστηρή τήρηση κατασκευαστικών αποστάσεων επικάλυψης και ενισχύσεις κόμβων.",
      },
    ],
  },
];

