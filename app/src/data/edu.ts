// Contenido educativo estático para el módulo de aprendizaje
// Se expandirá con los materiales de cada módulo

export const EDU_CATEGORIES = ['Marca', 'Redes', 'Ventas', 'Obra', 'Visual'] as const;
export type EduCategory = typeof EDU_CATEGORIES[number];
