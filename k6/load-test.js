import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 30 }, // ramp up to 30 users
    { duration: '1m', target: 30 },  // stay at 30 users
    { duration: '30s', target: 0 },  // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // less than 1% failed requests
  },
};

export default function () {
  const payload = JSON.stringify({
    author: "testuser",
    title: "Test Note",
    content: "This is a test note created during load testing.",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create note
  let res = http.post("http://devbook.local/api/v1/notes", payload, params);

  check(res, {
    'POST status is 200': (r) => r.status === 200,
    'POST response time < 500ms': (r) => r.timings.duration < 500,
  });

  if (res.status === 200) {
    // Extract note ID from response JSON (adjust 'id' key if different)
    const noteId = res.json('id');
    if (noteId) {
      // Delete the created note
      const deleteRes = http.del(`http://devbook.local/api/v1/notes/${noteId}`, null, params);
      check(deleteRes, {
        'DELETE status is 200': (r) => r.status === 200,
      });
    }
  }

  sleep(1);
}
