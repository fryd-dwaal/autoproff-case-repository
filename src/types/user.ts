export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  workshop: "North" | "South" | "West" | "";
  phone: string;
  email: string;
  jobTitle: string;
}
