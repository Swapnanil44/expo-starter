Changes to the plan

1. Consumer will be one type. I can see the plan I have either I baught it or other . suppose my parent didn't buy it , but he can see the Plan. If I bought the plan only then I can request cancle. So remove Family Member.

2. There will be no accept or reject from vendor end . vendor will be assigned a order by manager , manager will negotiate over call with vendor and then assign the vendor.

```
roles [icon: user, color: blue] {
  id bigint pk
  name varchar(30) unique
  description varchar(100)
  active boolean default true
}


users [icon: users, color: blue] {
  id bigint pk
  role_id bigint
  phone varchar(20) unique
  full_name varchar(100)
  status varchar(20)
  phone_verified boolean default false
  created_by_user_id bigint
  created_at timestamptz
  updated_at timestamptz
}


user_profiles [icon: user, color: blue] {
  user_id bigint pk
  date_of_birth date
  medical_notes text
  emergency_contact_name varchar(100)
  emergency_contact_phone varchar(20)
  emergency_contact_relation varchar(30)
  created_at timestamptz
  updated_at timestamptz
}


areas [icon: map-pin, color: green] {
  id bigint pk
  name varchar(100) unique
  city varchar(50) default Kolkata
  state varchar(50) default West Bengal
  active boolean default true
  created_at timestamptz
  updated_at timestamptz
}


addresses [icon: map-pin, color: green] {
  id bigint pk
  area_id bigint
  address_line_1 varchar(150)
  address_line_2 varchar(150)
  landmark varchar(100)
  city varchar(50)
  state varchar(50)
  postal_code varchar(10)
  latitude numeric(10,7)
  longitude numeric(10,7)
  created_at timestamptz
  updated_at timestamptz
}


user_addresses [icon: home, color: green] {
  id bigint pk
  user_id bigint
  address_id bigint
  label varchar(30)
  is_primary boolean default false
  created_at timestamptz
}


family_relations [icon: users, color: purple] {
  id bigint pk
  added_by_user_id bigint
  member_user_id bigint
  relationship varchar(30)
  health_data_consent boolean default false
  consented_at timestamptz
  created_at timestamptz
}


manager_areas [icon: map-pin, color: purple] {
  id bigint pk
  manager_user_id bigint
  area_id bigint
  active boolean default true
  assigned_at timestamptz
}


vendor_types [icon: building-2, color: orange] {
  id bigint pk
  name varchar(50) unique
  description varchar(150)
  active boolean default true
}


vendors [icon: building-2, color: orange] {
  id bigint pk
  vendor_type_id bigint
  owner_user_id bigint
  address_id bigint
  name varchar(120)
  contact_phone varchar(20)
  email varchar(120)
  active boolean default true
  created_by_user_id bigint
  created_at timestamptz
  updated_at timestamptz
}


vendor_employees [icon: users, color: orange] {
  id bigint pk
  vendor_id bigint
  user_id bigint
  added_by_user_id bigint
  active boolean default true
  created_at timestamptz
}


services [icon: activity, color: red] {
  id bigint pk
  name varchar(100)
  description text
  service_type varchar(20)
  assistance_charge numeric(12,2)
  listed_vendor_charge numeric(12,2)
  field_schema jsonb
  active boolean default true
  created_at timestamptz
  updated_at timestamptz
}


vendor_services [icon: activity, color: orange] {
  id bigint pk
  vendor_id bigint
  service_id bigint
  quoted_price numeric(12,2)
  active boolean default true
  created_at timestamptz
  updated_at timestamptz
}


plans [icon: package, color: blue] {
  id bigint pk
  name varchar(100)
  description text
  duration_value int default 1
  duration_type varchar(20)
  active boolean default true
  created_at timestamptz
  updated_at timestamptz
}


plan_services [icon: activity, color: blue] {
  id bigint pk
  plan_id bigint
  service_id bigint
  quota_count int
  quota_reset_period varchar(20)
  created_at timestamptz
}


plan_subscriptions [icon: package, color: purple] {
  id bigint pk
  plan_id bigint
  buyer_user_id bigint
  beneficiary_user_id bigint
  status varchar(30)
  total_assistance_price numeric(12,2)
  points_balance numeric(12,2)
  starts_at timestamptz
  expires_at timestamptz
  purchased_at timestamptz
  created_at timestamptz
  updated_at timestamptz
}


subscription_services [icon: activity, color: purple] {
  id bigint pk
  subscription_id bigint
  service_id bigint
  source varchar(20)
  quota_count int
  quota_reset_period varchar(20)
  assistance_charge_snapshot numeric(12,2)
  created_at timestamptz
}


quota_periods [icon: calendar, color: purple] {
  id bigint pk
  subscription_service_id bigint
  period_start timestamptz
  period_end timestamptz
  quota_limit int
  reserved_count int default 0
  used_count int default 0
  created_at timestamptz
  updated_at timestamptz
}


points_ledger [icon: wallet, color: green] {
  id bigint pk
  subscription_id bigint
  request_id bigint
  plan_cancellation_id bigint
  transaction_type varchar(30)
  amount numeric(12,2)
  balance_after numeric(12,2)
  description varchar(200)
  created_at timestamptz
}


recurring_schedules [icon: repeat, color: purple] {
  id bigint pk
  subscription_service_id bigint
  requested_by_user_id bigint
  repeat_rule jsonb
  starts_at timestamptz
  ends_at timestamptz
  status varchar(20)
  created_at timestamptz
  cancelled_at timestamptz
}


service_requests [icon: clipboard-list, color: red] {
  id bigint pk
  subscription_id bigint
  subscription_service_id bigint
  quota_period_id bigint
  service_id bigint
  beneficiary_user_id bigint
  requested_by_user_id bigint
  recurring_schedule_id bigint
  address_id bigint
  area_id bigint
  assigned_manager_id bigint
  assigned_vendor_id bigint

  request_type varchar(20)
  status varchar(30)

  scheduled_at timestamptz
  service_details jsonb
  consumer_note text

  assistance_charge_snapshot numeric(12,2)
  listed_vendor_charge_snapshot numeric(12,2)
  negotiated_price numeric(12,2)

  unfulfilled_reason text
  cancellation_reason text
  cancelled_by_user_id bigint

  accepted_at timestamptz
  vendor_assigned_at timestamptz
  started_at timestamptz
  service_done_at timestamptz
  fulfilled_at timestamptz
  cancelled_at timestamptz

  created_at timestamptz
  updated_at timestamptz
}


request_status_history [icon: history, color: gray] {
  id bigint pk
  request_id bigint
  changed_by_user_id bigint
  from_status varchar(30)
  to_status varchar(30)
  note text
  created_at timestamptz
}


request_notes [icon: message-circle, color: gray] {
  id bigint pk
  request_id bigint
  created_by_user_id bigint
  note text
  created_at timestamptz
}


request_documents [icon: file-text, color: gray] {
  id bigint pk
  request_id bigint
  uploaded_by_user_id bigint
  document_type varchar(30)
  file_name varchar(150)
  file_url text
  metadata jsonb
  created_at timestamptz
}


payments [icon: credit-card, color: green] {
  id bigint pk
  payer_user_id bigint
  subscription_id bigint
  request_id bigint
  collected_by_manager_id bigint

  payment_type varchar(30)
  method varchar(20)
  amount numeric(12,2)
  status varchar(20)

  provider varchar(50)
  provider_payment_id varchar(150)
  transaction_reference varchar(150)

  paid_at timestamptz
  created_at timestamptz
  updated_at timestamptz
}


cash_service_settlements [icon: banknote, color: green] {
  id bigint pk
  request_id bigint unique
  manager_user_id bigint
  amount_collected numeric(12,2)
  vendor_amount_paid numeric(12,2)
  platform_margin numeric(12,2)
  vendor_paid_at timestamptz
  recorded_at timestamptz
}


manager_cash_deposits [icon: landmark, color: green] {
  id bigint pk
  manager_user_id bigint
  amount numeric(12,2)
  reference varchar(150)
  recorded_by_admin_id bigint
  deposited_at timestamptz
  created_at timestamptz
}


vendor_payouts [icon: circle-dollar-sign, color: orange] {
  id bigint pk
  vendor_id bigint
  period_start date
  period_end date
  total_amount numeric(12,2)
  status varchar(20)
  payout_reference varchar(150)
  recorded_by_admin_id bigint
  paid_at timestamptz
  created_at timestamptz
}


vendor_payout_items [icon: list, color: orange] {
  id bigint pk
  payout_id bigint
  request_id bigint unique
  amount numeric(12,2)
  created_at timestamptz
}


plan_cancellations [icon: x-circle, color: red] {
  id bigint pk
  subscription_id bigint
  requested_by_user_id bigint
  reason text
  status varchar(20)

  remaining_points_snapshot numeric(12,2)
  approved_refund_amount numeric(12,2)

  reviewed_by_admin_id bigint
  decision_note text

  requested_at timestamptz
  decided_at timestamptz
}


refunds [icon: rotate-ccw, color: green] {
  id bigint pk
  cancellation_id bigint unique
  original_payment_id bigint
  beneficiary_user_id bigint
  processed_by_admin_id bigint

  amount numeric(12,2)
  method varchar(30)
  status varchar(20)
  reference varchar(150)

  processed_at timestamptz
  created_at timestamptz
}


request_ratings [icon: star, color: yellow] {
  id bigint pk
  request_id bigint unique
  rated_by_user_id bigint
  manager_rating int
  vendor_rating int
  comment text
  created_at timestamptz
}


notifications [icon: bell, color: blue] {
  id bigint pk
  request_id bigint
  subscription_id bigint
  event_type varchar(50)
  title varchar(150)
  message text
  created_at timestamptz
}


notification_recipients [icon: send, color: blue] {
  id bigint pk
  notification_id bigint
  user_id bigint
  channel varchar(20)
  status varchar(20)
  sent_at timestamptz
  read_at timestamptz
}


audit_logs [icon: shield-check, color: gray] {
  id bigint pk
  actor_user_id bigint
  entity_type varchar(50)
  entity_id bigint
  action varchar(50)
  old_data jsonb
  new_data jsonb
  created_at timestamptz
}


users.role_id > roles.id
users.created_by_user_id > users.id

user_profiles.user_id > users.id

addresses.area_id > areas.id

user_addresses.user_id > users.id
user_addresses.address_id > addresses.id

family_relations.added_by_user_id > users.id
family_relations.member_user_id > users.id

manager_areas.manager_user_id > users.id
manager_areas.area_id > areas.id

vendors.vendor_type_id > vendor_types.id
vendors.owner_user_id > users.id
vendors.address_id > addresses.id
vendors.created_by_user_id > users.id

vendor_employees.vendor_id > vendors.id
vendor_employees.user_id > users.id
vendor_employees.added_by_user_id > users.id

vendor_services.vendor_id > vendors.id
vendor_services.service_id > services.id

plan_services.plan_id > plans.id
plan_services.service_id > services.id

plan_subscriptions.plan_id > plans.id
plan_subscriptions.buyer_user_id > users.id
plan_subscriptions.beneficiary_user_id > users.id

subscription_services.subscription_id > plan_subscriptions.id
subscription_services.service_id > services.id

quota_periods.subscription_service_id > subscription_services.id

points_ledger.subscription_id > plan_subscriptions.id
points_ledger.request_id > service_requests.id
points_ledger.plan_cancellation_id > plan_cancellations.id

recurring_schedules.subscription_service_id > subscription_services.id
recurring_schedules.requested_by_user_id > users.id

service_requests.subscription_id > plan_subscriptions.id
service_requests.subscription_service_id > subscription_services.id
service_requests.quota_period_id > quota_periods.id
service_requests.service_id > services.id
service_requests.beneficiary_user_id > users.id
service_requests.requested_by_user_id > users.id
service_requests.recurring_schedule_id > recurring_schedules.id
service_requests.address_id > addresses.id
service_requests.area_id > areas.id
service_requests.assigned_manager_id > users.id
service_requests.assigned_vendor_id > vendors.id
service_requests.cancelled_by_user_id > users.id

request_status_history.request_id > service_requests.id
request_status_history.changed_by_user_id > users.id

request_notes.request_id > service_requests.id
request_notes.created_by_user_id > users.id

request_documents.request_id > service_requests.id
request_documents.uploaded_by_user_id > users.id

payments.payer_user_id > users.id
payments.subscription_id > plan_subscriptions.id
payments.request_id > service_requests.id
payments.collected_by_manager_id > users.id

cash_service_settlements.request_id > service_requests.id
cash_service_settlements.manager_user_id > users.id

manager_cash_deposits.manager_user_id > users.id
manager_cash_deposits.recorded_by_admin_id > users.id

vendor_payouts.vendor_id > vendors.id
vendor_payouts.recorded_by_admin_id > users.id

vendor_payout_items.payout_id > vendor_payouts.id
vendor_payout_items.request_id > service_requests.id

plan_cancellations.subscription_id > plan_subscriptions.id
plan_cancellations.requested_by_user_id > users.id
plan_cancellations.reviewed_by_admin_id > users.id

refunds.cancellation_id > plan_cancellations.id
refunds.original_payment_id > payments.id
refunds.beneficiary_user_id > users.id
refunds.processed_by_admin_id > users.id

request_ratings.request_id > service_requests.id
request_ratings.rated_by_user_id > users.id

notifications.request_id > service_requests.id
notifications.subscription_id > plan_subscriptions.id

notification_recipients.notification_id > notifications.id
notification_recipients.user_id > users.id

audit_logs.actor_user_id > users.id
```