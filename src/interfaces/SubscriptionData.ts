export interface SubscriptionData {
  verb: "created" | "updated";
  data: any;
  previous?: any;
  id: number;
}
