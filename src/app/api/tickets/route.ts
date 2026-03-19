import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // BUG 4 INTENCIONAL: Fuga de datos
    // El usuario (simulado) pertenece a 'TechCorp', pero aquí traemos todos los tickets
    // de la base de datos sin filtrar.
    const tickets = await prisma.ticket.findMany({
      /*Se añadío el "where" con TechCorp para el filtro,
      en este caso al no tener un usuario de la sesión
      en la bd, se opta por usar directamente el Id de 
      la compañía
      */
      orderBy: { createdAt: 'desc' }, where: { companyId:"TechCorp" }
      // Falta: where: { companyId: 'TechCorp' } o usando el usuario de la sesión
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json({ error: 'Error fetching tickets' }, { status: 500 })
  }
}
