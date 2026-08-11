export interface Slider {
  id: string;
  title: string;
  type: string;
  image: string;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  updated_at?: string | null;
  status?: string | null;
  description?: string | null;
  is_active?: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  cat_id: string;
  type: string;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface InnerActivity {
  id: string;
  activity_id: string;
  name: string;
  description: string | null;
  image: string | null;
  position: number;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface Article {
  id: string;
  category_id: string;
  category: string | null;
  title: string;
  image: string | null;
  article_date: string | null;
  article_owner: string | null;
  description: string | null;
  updated_at?: string | null;
  status: number;
  is_published: boolean;
  created_at: string;
}

export interface EventItem {
  id: string;
  category_id: string;
  category: string | null;
  title: string;
  from_date: string | null;
  to_date: string | null;
  description: string | null;
  image: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface MediaItem {
  category_id: string;
  category: string | null;
  type: string;
  image: string | null;
  id: string;
  title: string;
  published_date: string | null;
  publisher_name: string | null;
  description: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface Gallery {
  id: string;
  category_id: string;
  category: string | null;
  title: string;
  image: string | null;
  year: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface ImportantLink {
  id: string;
  links: string;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  image: string | null;
  video_link: string;
  video_id: string | null;
  description: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface Patrika {
  id: string;
  patrika_name: string;
  patrika_year: string | null;
  patrika_file: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface Story {
  id: string;
  title: string;
  image: string | null;
  story_place: string | null;
  story_date: string | null;
  description: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface StateItem {
  id: string;
  name: string;
  country_id: string;
  country_name: string;
}

export interface CityItem {
  id: string;
  city_name: string;
  state_id: string;
  state_name: string;
  event_id: string;
  testimonial_counter: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  email: string | null;
  place: string | null;
  description: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface CoachingOrganizationItem {
  id: string;
  name: string;
  slug: string | null;
  image: string | null;
  updated_at?: string | null;
  status: number;
  is_active: boolean;
  created_at: string;
}

export interface ContactItem {
  id: string;
  name: string;
  email: string | null;
  mobile: string;
  comments: string;
  subject: string | null;
  state_id: string;
  state_name: string | null;
  city_id: string;
  city_name: string | null;
  address: string | null;
  created_at: string;
}

export interface CsrFormItem {
  id: string;
  company_name: string;
  concern_person: string;
  mobile: string;
  email: string | null;
  city: string;
  tehsil_block: string;
  district: string;
  state: string;
  status: number;
  created_at: string;
  updated_at?: string | null;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  skills: string | null;
  is_active: boolean;
  joined_at: string | null;
  created_at: string;
}

export interface Feedback {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
  rating: number | null;
  is_read: boolean;
  created_at: string;
}

export interface GuestBook {
  id: string;
  name: string;
  email: string | null;
  message: string;
  is_approved: boolean;
  created_at: string;
}

export interface BrilliantStudent {
  id: string;
  name: string;
  achievement: string | null;
  school: string | null;
  year: number | null;
  image_url: string | null;
  created_at: string;
}

export interface SammanSamarohRegistrationItem {
  id: string;
  student_name: string;
  father_name: string;
  permanent_address: string;
  state_id: string;
  state_name: string | null;
  city_id: string;
  city_name: string | null;
  tehsil: string;
  district: string;
  aadhaar_number: string;
  mobile: string;
  email: string | null;
  academic_session: string;
  class_course_degree: string;
  marks_percentage: number | null;
  roll_number: string;
  board_university: string;
  school_name: string | null;
  school_address: string | null;
  current_study_details: string | null;
  result_document: string;
  accepted_declaration: boolean;
  status: string;
  created_at: string;
  updated_at?: string | null;
}

export interface AppointedEmployee {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  appointed_date: string | null;
  image_url: string | null;
  created_at: string;
}

export interface RetiredEmployee {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  retired_date: string | null;
  years_of_service: number | null;
  image_url: string | null;
  created_at: string;
}

export interface SpecialAchievement {
  id: string;
  title: string;
  description: string | null;
  recipient_name: string | null;
  achieved_date: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Registration {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  registration_type: string;
  status: string;
  created_at: string;
}

export interface SbgbpRegistrationItem {
  id: string;
  circle: string;
  circle_code: number | null;
  reg_year: number | null;
  registration_no: string;
  new_registration_no: string;
  new_roll_no: string;
  check_roll_no: string;
  student_name: string;
  student_image: string | null;
  father_name: string;
  mother_name: string;
  user_category: string;
  p_address: string;
  contest_type: string;
  class: string;
  school_name: string;
  pay_receipt: string | null;
  transaction_id: string | null;
  uid: string | null;
  mobile: string;
  mobile_guardian: string;
  email: string | null;
  payment_amount: number | null;
  payment_status: string;
  razorpay_payment_id: string | null;
  razorpay_order_id: string | null;
  razorpay_signature: string | null;
  roll_no: string | null;
  from_exam_time: string | null;
  to_exam_time: string | null;
  exam_time: string | null;
  exam_date: string | null;
  exam_centre: string | null;
  term_and_condition: boolean;
  status: number;
  created_at: string;
  updated_at?: string | null;
}

export interface UtthanCoachingRegistrationItem {
  id: string;
  organization_name: string;
  student_name: string;
  gender: string;
  date_of_birth: string;
  qualification: string;
  mobile: string;
  email: string;
  student_id_number: string;
  student_id_photo: string | null;
  father_name: string;
  father_id_number: string | null;
  father_id_photo: string | null;
  category: string;
  current_address: string;
  permanent_address: string;
  state_name: string;
  city_name: string;
  course_name: string;
  course_admission_date: string;
  course_admission_year: number | null;
  course_duration: string;
  student_photo: string;
  blood_group: string | null;
  aadhaar_number: string | null;
  accepted_terms: boolean;
  status: string;
  created_at: string;
  updated_at?: string | null;
}
