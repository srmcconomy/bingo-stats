const baseUrl = "https://racetime.gg";

const fetchRacetime = async <T>(path: string) => {
  const response = await fetch(`${baseUrl}${path}`);
  return response.json() as T;
};

export namespace api {
  export const races = async (page = 1) =>
    fetchRacetime<{
      count: number;
      num_pages: number;
      races: Race[];
    }>(`/oot/races/data?show_entrants=true&page=${page}`);
  export type RaceStatus =
    | "open"
    | "invitational"
    | "pending"
    | "in_progress"
    | "finished"
    | "cancelled";

  export type EntrantStatus =
    | "requested"
    | "invited"
    | "declined"
    | "ready"
    | "not_ready"
    | "in_progress"
    | "done"
    | "dnf"
    | "dq";

  export type Entrant = {
    user: {
      id: string;
      full_name: string;
      name: string;
      discriminator: string;
      url: string;
      avatar: string;
      pronouns: string;
      flair: string;
      twitch_name: string;
      twitch_channel: string;
      can_moderate: boolean;
    };
    status: {
      value: EntrantStatus;
      verbose_value: string;
      help_text: string;
    };
    finish_time: string;
    finished_at: string;
    place: number;
    place_ordinal: string;
    score: number;
    score_change: number | null;
    comment: string | null;
    has_comment: boolean;
    stream_live: boolean;
    stream_override: boolean;
  };

  export type Race = {
    name: string;
    category: {
      name: string;
      short_name: string;
      slug: string;
      url: string;
      data_url: string;
    };
    status: {
      value: RaceStatus;
      verbose_value: string;
      help_text: string;
    };
    url: string;
    data_url: string;
    goal: {
      name: string;
      custom: boolean;
    };
    info: string;
    entrants_count: number;
    entrants_count_finished: number;
    entrants_count_inactive: number;
    opened_at: string;
    started_at: string;
    time_limited: string;
    entrants: Entrant[];
  };
}
