import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import type { Event } from 'env';

export async function getEvents() {
  const responses = await directus.request<Event[]>(
    readItems('events', {
      fields: [
        'id',
        'name',
        'description',
        'image',
        'start_date',
        'end_date',
        'url',
        'location',
        'organizer_name',
        'organizer_url',
      ],
      sort: ['-start_date'],
    })
  );
  const events: Event[] = responses.map((res) => ({
    id: res.id,
    name: res.name,
    description: res.description,
    image: res.image,
    start_date: new Date(res.start_date),
    end_date: new Date(res.end_date),
    url: res.url,
    location: res.location,
    organizer_name: res.organizer_name,
    organizer_url: res.organizer_url,
  }));

  return events;
}
