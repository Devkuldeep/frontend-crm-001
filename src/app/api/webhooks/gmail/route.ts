export async function GET() {
  return Response.json({ route: 'gmail-webhook', success: true });
}
