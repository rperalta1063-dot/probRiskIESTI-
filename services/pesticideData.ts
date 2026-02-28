
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
    notes: "Insecticida y acaricida de alta potencia. El ARfD se basa en estudios de neurotoxicidad (signos clínicos observados en estudios agudos)." 
  },
  { 
    name: "Acefato", 
    arfd: 0.003, 
    source: "JMPR 2011", 
    notes: "Organofosforado con acción sistémica. Inhibidor de la colinesterasa." 
  },
  { 
    name: "Acetamiprid", 
    arfd: 0.1, 
    source: "EFSA 2016", 
    notes: "Neonicotinoide. Actúa sobre los receptores nicotínicos de acetilcolina." 
  },
  { 
    name: "Azoxistrobina", 
    arfd: 0.2, 
    source: "JMPR 2008", 
    notes: "Fungicida del grupo de las estrobirulinas. Baja toxicidad aguda general." 
  },
  { 
    name: "Captan", 
    arfd: 0.3, 
    source: "JMPR 2004", 
    notes: "Fungicida protector. El ARfD considera efectos de irritación gástrica." 
  },
  { 
    name: "Carbendazim", 
    arfd: 0.1, 
    source: "JMPR 2005", 
    notes: "Fungicida benzimidazol. Posee potencial de toxicidad para el desarrollo." 
  },
  { 
    name: "Clorpirifos", 
    arfd: 0.005, 
    source: "EFSA 2019", 
    notes: "Restricciones severas en UE. Potencial neurotóxico del desarrollo." 
  },
  { 
    name: "Clortalonil", 
    arfd: 0.6, 
    source: "JMPR 2009", 
    notes: "Fungicida no sistémico de amplio espectro." 
  },
  { 
    name: "Cipermetrina", 
    arfd: 0.04, 
    source: "JMPR 2006", 
    notes: "Piretroide de tipo II. Efectos sobre el sistema nervioso central." 
  },
  { 
    name: "Deltametrina", 
    arfd: 0.01, 
    source: "JMPR 2000", 
    notes: "Piretroide sintético altamente potente." 
  },
  { 
    name: "Diazinon", 
    arfd: 0.003, 
    source: "JMPR 2006", 
    notes: "Insecticida organofosforado. Inhibidor potente de AChE." 
  },
  { 
    name: "Dicamba", 
    arfd: 0.5, 
    source: "JMPR 2010", 
    notes: "Herbicida derivado del ácido benzoico." 
  },
  { 
    name: "Dimetoato", 
    arfd: 0.01, 
    source: "JMPR 2019", 
    notes: "Organofosforado sistémico. Metabolito principal: Ometoato." 
  },
  { 
    name: "Espinosad", 
    arfd: 0.1, 
    source: "JMPR 2001", 
    notes: "Mezcla de espinosinas A y D. Derivado de la fermentación bacteriana." 
  },
  { 
    name: "Fipronil", 
    arfd: 0.003, 
    source: "JMPR 2000", 
    notes: "Insecticida de la familia de los fenilpirazoles." 
  },
  { 
    name: "Fludioxonil", 
    arfd: 1.0, 
    source: "JMPR 2004", 
    notes: "Fungicida derivado del pirrol. Muy baja toxicidad aguda." 
  },
  { 
    name: "Glifosato", 
    arfd: 0.5, 
    source: "JMPR 2016", 
    notes: "Herbicida no selectivo. Ampliamente debatido, ARfD establecido por consenso científico." 
  },
  { 
    name: "Imidacloprid", 
    arfd: 0.4, 
    source: "EFSA 2013", 
    notes: "Neonicotinoide sistémico con alta movilidad en el suelo." 
  },
  { 
    name: "Lambda-cialotrina", 
    arfd: 0.007, 
    source: "JMPR 2007", 
    notes: "Piretroide con alta eficacia a dosis muy bajas." 
  },
  { 
    name: "Malatión", 
    arfd: 2.0, 
    source: "JMPR 2016", 
    notes: "Organofosforado de baja toxicidad para mamíferos por rápida degradación." 
  },
  { 
    name: "Metomilo", 
    arfd: 0.02, 
    source: "JMPR 2001", 
    notes: "Carbamato altamente tóxico por ingestión." 
  },
  { 
    name: "Piraclostrobina", 
    arfd: 0.05, 
    source: "JMPR 2003", 
    notes: "Fungicida de amplio espectro, inhibidor de la respiración celular." 
  },
  { 
    name: "Tebuconazol", 
    arfd: 0.03, 
    source: "JMPR 2010", 
    notes: "Fungicida triazol sistémico." 
  },
  { 
    name: "Tiametoxam", 
    arfd: 1.0, 
    source: "EFSA 2014", 
    notes: "Neonicotinoide de segunda generación." 
  },
  { 
    name: "Bifentrina", 
    arfd: 0.01, 
    source: "JMPR 2009", 
    notes: "Piretroide con actividad insecticida y acaricida." 
  },
  { 
    name: "Buprofezin", 
    arfd: 0.5, 
    source: "JMPR 1999", 
    notes: "Regulador del crecimiento de insectos (IGR)." 
  },
  { 
    name: "Clotianidina", 
    arfd: 0.1, 
    source: "EFSA 2014", 
    notes: "Neonicotinoide altamente sistémico." 
  },
  { 
    name: "Difenoconazol", 
    arfd: 0.3, 
    source: "JMPR 2007", 
    notes: "Fungicida triazol de amplio espectro." 
  },
  { 
    name: "Etoxazol", 
    arfd: 0.5, 
    source: "JMPR 2010", 
    notes: "Acaricida que inhibe la síntesis de quitina." 
  },
  { 
    name: "Fenitrotión", 
    arfd: 0.04, 
    source: "JMPR 2000", 
    notes: "Insecticida organofosforado de contacto." 
  },
  { 
    name: "Fenpiroximato", 
    arfd: 0.01, 
    source: "JMPR 2010", 
    notes: "Acaricida fenoxipirazol. Inhibidor del transporte de electrones mitocondrial." 
  },
  { 
    name: "Fosmet", 
    arfd: 0.2, 
    source: "JMPR 2003", 
    notes: "Organofosforado no sistémico." 
  },
  { 
    name: "Imazalil", 
    arfd: 0.05, 
    source: "JMPR 2001", 
    notes: "Fungicida sistémico utilizado frecuentemente en post-cosecha." 
  },
  { 
    name: "Indoxacarb", 
    arfd: 0.1, 
    source: "JMPR 2005", 
    notes: "Oxadiazina que bloquea los canales de sodio en insectos." 
  },
  { 
    name: "Lufenurón", 
    arfd: 0.2, 
    source: "JMPR 2015", 
    notes: "Benzoilurea inhibidora de la síntesis de quitina." 
  },
  { 
    name: "Metidatión", 
    arfd: 0.01, 
    source: "JMPR 1992", 
    notes: "Insecticida y acaricida organofosforado." 
  },
  { 
    name: "Metiocarb", 
    arfd: 0.02, 
    source: "JMPR 1998", 
    notes: "Carbamato con propiedades insecticidas, acaricidas y molusquicidas." 
  },
  { 
    name: "Miclobutanil", 
    arfd: 0.02, 
    source: "JMPR 1992", 
    notes: "Fungicida triazol sistémico." 
  },
  { 
    name: "Oxamilo", 
    arfd: 0.009, 
    source: "JMPR 2002", 
    notes: "Carbamato sistémico con actividad insecticida, acaricida y nematicida." 
  },
  { 
    name: "Permetrina", 
    arfd: 0.05, 
    source: "JMPR 1999", 
    notes: "Piretroide de tipo I. Amplio uso en agricultura y salud pública." 
  },
  { 
    name: "Propargita", 
    arfd: 0.01, 
    source: "JMPR 1999", 
    notes: "Acaricida no sistémico con acción residual." 
  },
  { 
    name: "Propiconazol", 
    arfd: 0.3, 
    source: "JMPR 2004", 
    notes: "Fungicida triazol sistémico de amplio espectro." 
  },
  { 
    name: "Espinetoram", 
    arfd: 0.1, 
    source: "JMPR 2008", 
    notes: "Insecticida de la familia de las espinosinas." 
  },
  { 
    name: "Espiromesifén", 
    arfd: 0.5, 
    source: "JMPR 2016", 
    notes: "Insecticida y acaricida del grupo de los ácidos tetrónicos." 
  },
  { 
    name: "Tiacloprid", 
    arfd: 0.02, 
    source: "EFSA 2015", 
    notes: "Neonicotinoide. Actúa sobre el sistema nervioso central de los insectos." 
  },
  { 
    name: "Trifloxistrobina", 
    arfd: 0.5, 
    source: "JMPR 2004", 
    notes: "Fungicida del grupo de las estrobirulinas." 
  },
  { 
    name: "Ziram", 
    arfd: 0.08, 
    source: "JMPR 1996", 
    notes: "Fungicida ditiocarbamato." 
  },
  { 
    name: "Boscalid", 
    arfd: 0.1, 
    source: "JMPR 2006", 
    notes: "Fungicida de la familia de las carboxamidas." 
  },
  { 
    name: "Ciprodinil", 
    arfd: 0.6, 
    source: "JMPR 2003", 
    notes: "Fungicida anilinopirimidina." 
  },
  { 
    name: "Fenhexamida", 
    arfd: 0.3, 
    source: "JMPR 2005", 
    notes: "Fungicida hidroxianilida." 
  },
  { 
    name: "Fluopiram", 
    arfd: 0.5, 
    source: "JMPR 2010", 
    notes: "Fungicida de amplio espectro." 
  },
  { 
    name: "Metalaxil", 
    arfd: 0.5, 
    source: "JMPR 2002", 
    notes: "Fungicida fenilamida sistémico." 
  },
  { 
    name: "Pendimetalina", 
    arfd: 0.1, 
    source: "JMPR 2016", 
    notes: "Herbicida dinitroanilina." 
  },
  { 
    name: "Pirimetanil", 
    arfd: 0.2, 
    source: "JMPR 2007", 
    notes: "Fungicida anilinopirimidina." 
  },
  { 
    name: "Espirotetramat", 
    arfd: 1.0, 
    source: "JMPR 2008", 
    notes: "Insecticida sistémico derivado del ácido tetrónico." 
  },
  { 
    name: "Chlorantraniliprole", 
    arfd: 2.0, 
    source: "JMPR 2008", 
    notes: "Insecticide de la famille des diamidas antranílicas." 
  },
  { 
    name: "Flubendiamida", 
    arfd: 0.2, 
    source: "JMPR 2010", 
    notes: "Insecticida diamida que actúa sobre los receptores de rianodina." 
  }
].sort((a, b) => a.name.localeCompare(b.name));
