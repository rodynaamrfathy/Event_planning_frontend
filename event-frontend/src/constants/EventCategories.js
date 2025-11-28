
export const EVENT_CATEGORIES = {
    ALL: 'All',
    TECH: 'Tech',
    MUSIC: 'Music',
    ART: 'Art',
    SOCIAL: 'Social',
    // Add any other categories you need here
};

// Also define the list of categories used for filtering dropdowns (excluding 'All')
export const FILTERABLE_CATEGORIES = [
    EVENT_CATEGORIES.TECH,
    EVENT_CATEGORIES.MUSIC,
    EVENT_CATEGORIES.ART,
    EVENT_CATEGORIES.SOCIAL,
];