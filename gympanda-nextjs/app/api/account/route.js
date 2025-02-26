import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';  // Ensure correct path
import { NextResponse } from 'next/server';
import { updateAccountName } from '../../../db/db'; // Assuming you have a method to update the account

export async function PUT(req) {
  try {
    // Get the session on the server side
    const session = await getServerSession(authOptions);

    // Check if the session exists
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    // Proceed with updating the account name
    const userEmail = session.user.email;
    const updatedUser = await updateAccountName(userEmail, name);

    if (!updatedUser) {
      return NextResponse.json({ message: 'Failed to update account name' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Account name updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
