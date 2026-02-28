
export interface Food {
  name: string;
  lp_adult: number; // g/day
  lp_child: number; // g/day
  ue: number;       // g (unit weight)
  notes?: string;
}

export const FOOD_LIST: Food[] = [
  { 
    name: "Manzana", 
    lp_adult: 450, 
    lp_child: 250, 
    ue: 180,
    notes: "Consumo alto en niños. Unidad promedio según USDA." 
  },
  { 
    name: "Plátano", 
    lp_adult: 300, 
    lp_child: 180, 
    ue: 150,
    notes: "Peso de unidad sin cáscara aprox. 120g." 
  },
  { 
    name: "Tomate", 
    lp_adult: 280, 
    lp_child: 120, 
    ue: 120,
    notes: "Variabilidad alta en peso de unidad (cherry vs beefsteak)." 
  },
  { 
    name: "Uva", 
    lp_adult: 350, 
    lp_child: 150, 
    ue: 10,
    notes: "Caso 1 usualmente, pero puede aplicar Caso 2 para racimos." 
  },
  { 
    name: "Lechuga", 
    lp_adult: 200, 
    lp_child: 80, 
    ue: 500,
    notes: "Gran superficie de contacto. Consumo moderado." 
  },
  { 
    name: "Papa / Patata", 
    lp_adult: 400, 
    lp_child: 220, 
    ue: 200,
    notes: "Alimento básico. Consumo estable." 
  },
  { 
    name: "Pera", 
    lp_adult: 380, 
    lp_child: 200, 
    ue: 160,
    notes: "Perfil similar a la manzana." 
  },
  { 
    name: "Naranja", 
    lp_adult: 420, 
    lp_child: 240, 
    ue: 200,
    notes: "Ue incluye cáscara (ajustar si es necesario)." 
  },
  { 
    name: "Fresa", 
    lp_adult: 250, 
    lp_child: 130, 
    ue: 20,
    notes: "Producto pequeño, generalmente Caso 1." 
  },
  { 
    name: "Brócoli", 
    lp_adult: 180, 
    lp_child: 70, 
    ue: 350,
    notes: "Unidad referida a la cabeza entera." 
  },
  { 
    name: "Arroz", 
    lp_adult: 250, 
    lp_child: 120, 
    ue: 1,
    notes: "Alimento básico procesado/mezclado. Generalmente Caso 3." 
  },
  { 
    name: "Zanahoria", 
    lp_adult: 150, 
    lp_child: 80, 
    ue: 100,
    notes: "Consumo frecuente en crudo y cocido." 
  },
  { 
    name: "Sandía", 
    lp_adult: 650, 
    lp_child: 380, 
    ue: 5000,
    notes: "Unidad de gran tamaño. Consumo estacional alto." 
  },
  { 
    name: "Espinaca", 
    lp_adult: 150, 
    lp_child: 60, 
    ue: 250,
    notes: "Hortaliza de hoja. Peso referido a manojo estándar." 
  },
  { 
    name: "Pimiento", 
    lp_adult: 120, 
    lp_child: 55, 
    ue: 160,
    notes: "Variedad tipo California/Lamuya." 
  }
].sort((a, b) => a.name.localeCompare(b.name));
