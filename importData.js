import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const rawData = fs.readFileSync('userData.json', 'utf-8')
  const users = JSON.parse(rawData)

  for (const user of users) {
    console.log('Creating user:', user.id)

    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        profileImage: user.profileImage,
        goal: user.goal,
        endDate: user.endDate ? new Date(user.endDate._seconds * 1000) : null,
        personalRecords: {
          create: user.rekorder.map(r => ({
            ovelse: r.ovelse,
            vekt: r.vekt,
          })),
        },
        workouts: {
            create: user.detailedWorkouts.map(r => ({
                id: r.id,
                legacyWorkoutPlan: r.workoutProgram,
                date: r.date ? new Date(r.date._seconds * 1000) : null,
          })
            ),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    console.log(`Created user ${newUser.id}`)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
