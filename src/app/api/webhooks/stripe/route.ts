export async function GET() {
  return Response.json({ route: 'stripe-webhook', success: true });
}
