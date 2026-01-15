import { session } from '@descope/nextjs-sdk/server';
import { NextResponse } from 'next/server';

const BASEROW_API_URL = process.env.BASEROW_API_URL || 'https://api.baserow.io';
const BASEROW_TOKEN = process.env.BASEROW_TOKEN;
const USERS_TABLE_ID = process.env.BASEROW_USERS_TABLE_ID;
const STORIES_TABLE_ID = process.env.BASEROW_STORIES_TABLE_ID;

interface BaserowUser {
  id: number;
  Email: string;
  'Allowed-Tags': Array<{ id: number; value: string }>;
}

interface BaserowStory {
  id: number;
  Name: string;
  Notes: string;
  Active: boolean;
  Duration: number | null;
  'Guest-Name': string;
  'INF-Target-Name': string;
  'Image-URL': string;
  'Audio-URL': string;
  Tags: Array<{ id: number; value: string }>;
}

export async function GET() {
  // Check authentication
  const currentSession = await session();
  
  if (!currentSession) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Get user email from session token
  const userEmail = currentSession.token?.email;
  
  if (!userEmail) {
    return NextResponse.json(
      { error: 'No email found in session' },
      { status: 400 }
    );
  }

  try {
    // Step 1: Find user in Baserow by email
    const usersResponse = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${USERS_TABLE_ID}/?user_field_names=true&filter__Email__equal=${encodeURIComponent(userEmail)}`,
      {
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
        },
      }
    );

    if (!usersResponse.ok) {
      console.error('Baserow users query failed:', await usersResponse.text());
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    const usersData = await usersResponse.json();
    const users: BaserowUser[] = usersData.results;

    if (users.length === 0) {
      // User not in Baserow - return empty stories
      return NextResponse.json({ stories: [] });
    }

    const user = users[0];
    const allowedTags = user['Allowed-Tags'] || [];

    if (allowedTags.length === 0) {
      // User has no tags - return empty stories
      return NextResponse.json({ stories: [] });
    }

    // Step 2: Get all active stories
    const storiesResponse = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${STORIES_TABLE_ID}/?user_field_names=true&filter__Active__equal=true`,
      {
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`,
        },
      }
    );

    if (!storiesResponse.ok) {
      console.error('Baserow stories query failed:', await storiesResponse.text());
      return NextResponse.json(
        { error: 'Failed to fetch stories' },
        { status: 500 }
      );
    }

    const storiesData = await storiesResponse.json();
    const allStories: BaserowStory[] = storiesData.results;

    // Step 3: Filter stories by user's allowed tags
    const allowedTagIds = new Set(allowedTags.map(tag => tag.id));
    
    const filteredStories = allStories.filter(story => {
      const storyTags = story.Tags || [];
      // Story is visible if ANY of its tags match user's allowed tags
      return storyTags.some(tag => allowedTagIds.has(tag.id));
    });

    // Return filtered stories (without sensitive fields)
    const sanitizedStories = filteredStories.map(story => ({
      id: story.id,
      name: story.Name,
      notes: story.Notes,
      duration: story.Duration,
      guestName: story['Guest-Name'],
      infTargetName: story['INF-Target-Name'],
      imageUrl: story['Image-URL'],
      audioUrl: story['Audio-URL'],
      tags: story.Tags?.map(t => t.value) || [],
    }));

    return NextResponse.json({ stories: sanitizedStories });

  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
