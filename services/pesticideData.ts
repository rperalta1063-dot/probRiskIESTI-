
export interface Pesticide {
  name: string;
  arfd: number;
  source?: string;
  notes?: string;
}

export const PESTICIDE_LIST: Pesticide[] = [
  { 
    name: "Abamectina", 
    arfd: 0.005, 
    source: "JMPR 2015", 
    notes: "Insecticida y acaricida de alta potencia. ARfD basado en neurotoxicidad. LMRs establecidos en Codex (0.01-0.1 mg/kg). Aprobado en UE y USA." 
  },
  { 
    name: "Acefato", 
    arfd: 0.003, 
    source: "JMPR 2011", 
    notes: "Organofosforado sistémico. Inhibidor de AChE. LMRs en Codex suelen ser bajos (0.01-0.5 mg/kg). Uso restringido en diversas regiones por persistencia." 
  },
  { 
    name: "Acetamiprid", 
    arfd: 0.1, 
    source: "EFSA 2016", 
    notes: "Neonicotinoide. LMRs en UE varían ampliamente (0.01-5 mg/kg). Ampliamente aprobado para control de áfidos." 
  },
  { 
    name: "Azoxistrobina", 
    arfd: 0.2, 
    source: "JMPR 2008", 
    notes: "Fungicida estrobirulina. Baja toxicidad aguda. LMRs generosos en frutas y hortalizas (hasta 15 mg/kg). Aprobación global amplia." 
  },
  { 
    name: "Captan", 
    arfd: 0.3, 
    source: "JMPR 2004", 
    notes: "Fungicida protector. ARfD por irritación gástrica. LMRs significativos en frutas de hueso. Aprobado con restricciones de reentrada." 
  },
  { 
    name: "Carbendazim", 
    arfd: 0.1, 
    source: "JMPR 2005", 
    notes: "Fungicida benzimidazol. Potencial de toxicidad reproductiva. Uso muy restringido en UE; LMRs en Codex para diversos granos." 
  },
  { 
    name: "Clorpirifos", 
    arfd: 0.005, 
    source: "EFSA 2019", 
    notes: "Organofosforado. Prohibido en UE (2020) por neurotoxicidad. LMRs eliminados o reducidos al límite de detección (0.01 mg/kg) en muchas regiones." 
  },
  { 
    name: "Clortalonil", 
    arfd: 0.6, 
    source: "JMPR 2009", 
    notes: "Fungicida de contacto. No aprobado en UE desde 2019. LMRs en Codex aún vigentes para varios cultivos." 
  },
  { 
    name: "Cipermetrina", 
    arfd: 0.04, 
    source: "JMPR 2006", 
    notes: "Piretroide tipo II. LMRs en Codex varían de 0.05 a 2 mg/kg. Aprobación generalizada para control de plagas agrícolas." 
  },
  { 
    name: "Deltametrina", 
    arfd: 0.01, 
    source: "JMPR 2000", 
    notes: "Piretroide potente. LMRs bajos (0.01-0.5 mg/kg). Aprobado globalmente para uso agrícola y salud pública." 
  },
  { 
    name: "Diazinon", 
    arfd: 0.003, 
    source: "JMPR 2006", 
    notes: "Organofosforado. Inhibidor de AChE. LMRs en Codex (0.01-2 mg/kg). Uso restringido en UE para muchos cultivos alimentarios." 
  },
  { 
    name: "Dicamba", 
    arfd: 0.5, 
    source: "JMPR 2010", 
    notes: "Herbicida. LMRs establecidos en Codex (0.01-10 mg/kg en forrajes). Aprobado en USA y UE con regulaciones de deriva." 
  },
  { 
    name: "Dimetoato", 
    arfd: 0.01, 
    source: "JMPR 2019", 
    notes: "Organofosforado sistémico. LMRs en UE muy bajos (0.01 mg/kg) para muchos productos. Uso limitado por toxicidad de metabolitos." 
  },
  { 
    name: "Espinosad", 
    arfd: 0.1, 
    source: "JMPR 2001", 
    notes: "Insecticida biológico. LMRs en Codex (0.01-2 mg/kg). Aprobado para agricultura orgánica en muchas jurisdicciones." 
  },
  { 
    name: "Fipronil", 
    arfd: 0.003, 
    source: "JMPR 2000", 
    notes: "Insecticida fenilpirazol. LMRs bajos (0.001-0.02 mg/kg). Uso agrícola muy restringido en UE por impacto en polinizadores." 
  },
  { 
    name: "Fludioxonil", 
    arfd: 1.0, 
    source: "JMPR 2004", 
    notes: "Fungicida. Muy baja toxicidad. LMRs altos en post-cosecha (hasta 10 mg/kg). Aprobación global amplia." 
  },
  { 
    name: "Glifosato", 
    arfd: 0.5, 
    source: "JMPR 2016", 
    notes: "Herbicida no selectivo. LMRs en Codex hasta 30 mg/kg en granos. Estatus regulatorio bajo revisión continua en UE y USA." 
  },
  { 
    name: "Imidacloprid", 
    arfd: 0.4, 
    source: "EFSA 2013", 
    notes: "Neonicotinoide. Prohibido uso al aire libre en UE (2018). LMRs en Codex vigentes (0.01-5 mg/kg)." 
  },
  { 
    name: "Lambda-cialotrina", 
    arfd: 0.007, 
    source: "JMPR 2007", 
    notes: "Piretroide eficaz. LMRs en Codex (0.01-1 mg/kg). Aprobado en UE y USA para diversos cultivos." 
  },
  { 
    name: "Malatión", 
    arfd: 2.0, 
    source: "JMPR 2016", 
    notes: "Organofosforado. LMRs en Codex hasta 8 mg/kg en cereales. Aprobado con restricciones de intervalo de seguridad." 
  },
  { 
    name: "Metomilo", 
    arfd: 0.02, 
    source: "JMPR 2001", 
    notes: "Carbamato. Alta toxicidad aguda. LMRs en Codex (0.01-2 mg/kg). Aprobado en USA; uso restringido en UE." 
  },
  { 
    name: "Piraclostrobina", 
    arfd: 0.05, 
    source: "JMPR 2003", 
    notes: "Fungicida estrobirulina. LMRs en Codex (0.01-5 mg/kg). Aprobación global amplia para cereales y frutas." 
  },
  { 
    name: "Tebuconazol", 
    arfd: 0.03, 
    source: "JMPR 2010", 
    notes: "Fungicida triazol. LMRs en Codex (0.01-10 mg/kg). Aprobado en UE y USA; bajo vigilancia por efectos endocrinos." 
  },
  { 
    name: "Tiametoxam", 
    arfd: 1.0, 
    source: "EFSA 2014", 
    notes: "Neonicotinoide. LMRs en Codex (0.01-2 mg/kg). Prohibido uso al aire libre en UE (2018) por riesgo a abejas." 
  },
  { 
    name: "Bifentrina", 
    arfd: 0.01, 
    source: "JMPR 2009", 
    notes: "Piretroide. LMRs en Codex (0.01-1 mg/kg). Aprobado en USA; no aprobado para uso agrícola en UE." 
  },
  { 
    name: "Buprofezin", 
    arfd: 0.5, 
    source: "JMPR 1999", 
    notes: "Regulador de crecimiento. LMRs en Codex (0.01-10 mg/kg en cítricos). Aprobado en UE y USA." 
  },
  { 
    name: "Clotianidina", 
    arfd: 0.1, 
    source: "EFSA 2014", 
    notes: "Neonicotinoide. LMRs en Codex (0.01-1 mg/kg). Prohibido uso al aire libre en UE (2018)." 
  },
  { 
    name: "Difenoconazol", 
    arfd: 0.3, 
    source: "JMPR 2007", 
    notes: "Fungicida triazol. LMRs en Codex (0.01-5 mg/kg). Aprobación global amplia para hortalizas y frutales." 
  },
  { 
    name: "Etoxazol", 
    arfd: 0.5, 
    source: "JMPR 2010", 
    notes: "Acaricida. LMRs en Codex (0.01-0.5 mg/kg). Aprobado en UE y USA para control de ácaros." 
  },
  { 
    name: "Fenitrotión", 
    arfd: 0.04, 
    source: "JMPR 2000", 
    notes: "Organofosforado. LMRs en Codex hasta 10 mg/kg en cereales almacenados. No aprobado en UE." 
  },
  { 
    name: "Fenpiroximato", 
    arfd: 0.01, 
    source: "JMPR 2010", 
    notes: "Acaricida fenoxipirazol. LMRs en Codex (0.01-0.2 mg/kg). Aprobado en UE y USA para hortalizas y frutales." 
  },
  { 
    name: "Fosmet", 
    arfd: 0.2, 
    source: "JMPR 2003", 
    notes: "Organofosforado. LMRs en Codex (0.01-10 mg/kg). Aprobado en USA; uso restringido en UE por riesgo a trabajadores." 
  },
  { 
    name: "Imazalil", 
    arfd: 0.05, 
    source: "JMPR 2001", 
    notes: "Fungicida sistémico. LMRs en Codex altos en post-cosecha (hasta 15 mg/kg en cítricos). Aprobación global amplia." 
  },
  { 
    name: "Indoxacarb", 
    arfd: 0.1, 
    source: "JMPR 2005", 
    notes: "Oxadiazina. LMRs en Codex (0.01-2 mg/kg). Aprobado en UE y USA para control de lepidópteros." 
  },
  { 
    name: "Lufenurón", 
    arfd: 0.2, 
    source: "JMPR 2015", 
    notes: "Benzoilurea. LMRs en Codex (0.01-1 mg/kg). Aprobado en UE y USA; regulador de crecimiento de insectos." 
  },
  { 
    name: "Metidatión", 
    arfd: 0.01, 
    source: "JMPR 1992", 
    notes: "Organofosforado. LMRs en Codex (0.01-5 mg/kg). No aprobado en UE; uso muy limitado globalmente por toxicidad." 
  },
  { 
    name: "Metiocarb", 
    arfd: 0.02, 
    source: "JMPR 1998", 
    notes: "Carbamato. LMRs en Codex (0.01-0.5 mg/kg). Uso restringido en UE; aprobado en algunas regiones como molusquicida." 
  },
  { 
    name: "Miclobutanil", 
    arfd: 0.02, 
    source: "JMPR 1992", 
    notes: "Fungicida triazol. LMRs en Codex (0.01-2 mg/kg). Aprobado en UE y USA para frutales y vid." 
  },
  { 
    name: "Oxamilo", 
    arfd: 0.009, 
    source: "JMPR 2002", 
    notes: "Carbamato sistémico. LMRs en Codex (0.01-5 mg/kg). Aprobado en USA; uso restringido en UE por toxicidad aguda." 
  },
  { 
    name: "Permetrina", 
    arfd: 0.05, 
    source: "JMPR 1999", 
    notes: "Piretroide tipo I. LMRs en Codex (0.01-5 mg/kg). Aprobado globalmente; uso agrícola restringido en UE." 
  },
  { 
    name: "Propargita", 
    arfd: 0.01, 
    source: "JMPR 1999", 
    notes: "Acaricida. LMRs en Codex (0.01-10 mg/kg). Aprobado en USA; no aprobado en UE por preocupaciones de seguridad." 
  },
  { 
    name: "Propiconazol", 
    arfd: 0.3, 
    source: "JMPR 2004", 
    notes: "Fungicida triazol. LMRs en Codex (0.01-5 mg/kg). No aprobado en UE desde 2019 por toxicidad reproductiva." 
  },
  { 
    name: "Espinetoram", 
    arfd: 0.1, 
    source: "JMPR 2008", 
    notes: "Insecticida espinosina. LMRs en Codex (0.01-1 mg/kg). Aprobado en UE y USA para control de trips." 
  },
  { 
    name: "Espiromesifén", 
    arfd: 0.5, 
    source: "JMPR 2016", 
    notes: "Insecticida/Acaricida. LMRs en Codex (0.01-2 mg/kg). Aprobado en UE y USA para hortalizas." 
  },
  { 
    name: "Tiacloprid", 
    arfd: 0.02, 
    source: "EFSA 2015", 
    notes: "Neonicotinoide. No renovado en UE (2020) por efectos endocrinos. LMRs en Codex vigentes (0.01-2 mg/kg)." 
  },
  { 
    name: "Trifloxistrobina", 
    arfd: 0.5, 
    source: "JMPR 2004", 
    notes: "Fungicida estrobirulina. LMRs en Codex (0.01-5 mg/kg). Aprobación global amplia para frutales y cereales." 
  },
  { 
    name: "Ziram", 
    arfd: 0.08, 
    source: "JMPR 1996", 
    notes: "Fungicida ditiocarbamato. LMRs en Codex (0.01-5 mg/kg). Aprobado en UE y USA con restricciones de uso." 
  },
  { 
    name: "Boscalid", 
    arfd: 0.1, 
    source: "JMPR 2006", 
    notes: "Fungicida carboxamida. LMRs en Codex (0.01-10 mg/kg). Aprobado globalmente; muy estable en el medio ambiente." 
  },
  { 
    name: "Ciprodinil", 
    arfd: 0.6, 
    source: "JMPR 2003", 
    notes: "Fungicida anilinopirimidina. LMRs en Codex (0.01-5 mg/kg). Aprobado en UE y USA para frutales y vid." 
  },
  { 
    name: "Fenhexamida", 
    arfd: 0.3, 
    source: "JMPR 2005", 
    notes: "Fungicida hidroxianilida. LMRs en Codex (0.01-15 mg/kg en bayas). Aprobación global amplia para post-cosecha." 
  },
  { 
    name: "Fluopiram", 
    arfd: 0.5, 
    source: "JMPR 2010", 
    notes: "Fungicida. LMRs en Codex (0.01-5 mg/kg). Aprobado globalmente; eficaz contra nematodos y diversos hongos." 
  },
  { 
    name: "Metalaxil", 
    arfd: 0.5, 
    source: "JMPR 2002", 
    notes: "Fungicida sistémico. LMRs en Codex (0.01-10 mg/kg). Aprobación global amplia para tratamiento de semillas y suelo." 
  },
  { 
    name: "Pendimetalina", 
    arfd: 0.1, 
    source: "JMPR 2016", 
    notes: "Herbicida. LMRs en Codex bajos (0.01-0.1 mg/kg). Aprobado en UE y USA; uso pre-emergente extendido." 
  },
  { 
    name: "Pirimetanil", 
    arfd: 0.2, 
    source: "JMPR 2007", 
    notes: "Fungicida. LMRs en Codex (0.01-15 mg/kg en post-cosecha). Aprobado en UE y USA para hortalizas y frutales." 
  },
  { 
    name: "Espirotetramat", 
    arfd: 1.0, 
    source: "JMPR 2008", 
    notes: "Insecticida sistémico. LMRs en Codex (0.01-5 mg/kg). Aprobado en UE y USA para control de insectos chupadores." 
  },
  { 
    name: "Chlorantraniliprole", 
    arfd: 2.0, 
    source: "JMPR 2008", 
    notes: "Insecticida diamida. LMRs en Codex (0.01-2 mg/kg). Aprobación global amplia por su perfil de seguridad favorable." 
  },
  { 
    name: "Flubendiamida", 
    arfd: 0.2, 
    source: "JMPR 2010", 
    notes: "Insecticida diamida. LMRs en Codex (0.01-2 mg/kg). Aprobado en USA; estatus en UE bajo revisión." 
  }
].sort((a, b) => a.name.localeCompare(b.name));
