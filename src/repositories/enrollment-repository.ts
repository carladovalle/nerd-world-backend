import { prisma } from "../config/database";
import { Enrollment } from "@prisma/client";

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findById(enrollmentId: number) {
  return prisma.enrollment.findFirst({
    where: { id: enrollmentId }
  });
}

async function findByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId }
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      id: userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" >;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId" >;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findById,
  findByUserId
};

export default enrollmentRepository;