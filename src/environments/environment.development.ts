export const environment = {
    supabase: {
        API_URL: process.env['NG_APP_API_URL'] ?? '',
        API_KEY: process.env['NG_APP_API_KEY'] ?? ''
    }
};
