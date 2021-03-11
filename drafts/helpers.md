```php
// SCREENING
function actions_list_array()
function actions_list_dropdown($name='state', $selected=NULL, $id=NULL, $class=NULL)
function film_list_array()
function film_list_dropdown($name='state', $selected=NULL, $id=NULL, $class=NULL)
function screening_type_array()
function screening_type_dropdown($name='state', $selected=NULL, $id=NULL, $class=NULL)

// RSVP
function actions_list_array()
function event_id_array()
function event_list_dropdown($name='state', $selected=NULL, $id=NULL, $class=NULL)


// Site helpers
function auto_version($file)
function css_imports_as_links_for($css_filename)
function mobile_css_imports()
function styles_css_imports_to_extra_css(&$data)
function styles_css_imports()

// Security helpers
function xss_filter($str)
function xss_json($obj)

// View helpers
function get_program_domain($unit_id)
function get_unit_data_for_view($unit_id)
function include_mobile_footer_content()
function replace_pledgetype_with_unit_data($pledge_type, $unit_id)
function video_url_to_id( $url )


// User helpers
function abbr_to_name($abbr)
function abbr_to_name($abbr)
function alpha_numeric_only($text){
function alpha_only($text){
function asset_url($file_path)
function attach_ga_campaign_query($url, $name, $additional_params = null)
function bootstrap_field_val( $field_type, $field_name, $label = null, $value = null, $error = null, $class = 'form-control', $help_text = null, $add_on = null, $extra_attr = null, $custom_html = null)
function bootstrap_field( $field_type, $field_name, $label, $error = null )
function bootstrap_horiz_field_val( $field_type, $field_name, $label = null, $value = null, $error = null, $class = null, $help_text = null, $add_on = null, $extra_attr = null, $custom_html = null)
function bootstrap_textarea_val( $field_name, $label, $value = null, $error = null )
function bootstrapped_input( $data, $desc = null )
function bootstrapped_mobile_input($element, $name = '', $label = '', $required = false)
function check_and_update_texting_activity($user_id, $num_of_texts_shared)
function clean_client_text($dirtyHtml)
function clean_override_text_for_view($dirtyHtml)
function clean_pledge_page_text($dirty_html)
function cloudfront_url($file_name, $player_formatted = false)
function convert_seconds_to_human_time($secs){
function convert_time_to_seconds($time){
function countries_array()
function countries_array(){
function country_name_to_abbr($name)
function currency_to_int($dollar_value)
function date_offset($format, $time=NULL, $offset=NULL, $observe_dst=false, $offset_backup=NULL, $to_utc=false){
function date_to_utc($format, $time=NULL, $offset=NULL, $force_localization=NULL){
function day_dropdown($attributes,  $selected='')
function dds($arr, $title=NULL)
function dec_submitted_by_human_challenge($val)
function decimal_total($digit)}
function depth_picker($arr, $temp_string, &$collect)
function detect_encoding($string){
function does_file_exist($url){
function domain_exists($email){
function ellipsify($text, $length=30){
function format_affiliate_link($link, $affiliate){
function format_array_vals($vars, $id_key){
function format_currency($currency_value, $decimal_points = 2)
function format_date($time=NULL, $format=NULL, $offset=NULL, $force_localization=NULL){
function format_email($email){
function format_integer($integer_value)
function format_name_alt($str){
function format_name($string){
function format_phone($phone){
function generate_secure_random_string($size)
function get_affiliate_id()
function get_class_grade($class_grade_data, $grade_dict)
function get_css_base($data=null){
function get_cur_cache_bust(){
function get_current_url()
function get_day_iteration_of_month($date)
function get_default_color_theme_hex_code()
function get_film_id(){
function get_groups_for_program($program_id)
function get_img_base($data=null){
function get_img_path($data=null){
function get_limiter_session_value($name){
function get_nav_active($data){
function get_page_nav_link($data){
function get_pledge_string($quantity)
function get_prize_student_count($students)
function get_relative_time($ts){
function get_remaining_quantity($prize, $total_quantity)
function get_remote_file_size($url)
function get_req_dec($key, $default=null){
function get_req($key,$default=null){
function get_salt()
function get_site_template(){
function get_state_abbr($state=null)
function get_subdomain(){
function get_submitted_by_human_challenge($input=NULL)
function get_titan_admin_url($path)
function get_titan_url($path)
function get_unix_time($date){
function get_url_parts(){
function get_user_group($user_id = 0)
function get_users_web_browser()
function get_var($var_name, $default_val=null, $save_session=null){
function get_week_number_of_month($date, $rollover='sunday'){
function get_week_of_month($date)
function hash_challenge($val){
function high_res_time()
function image_upload($file_field, $upload_dir, $allowed_types = 'gif|jpg|jpeg|jpe|png'){}
function in_arrayi($needle, $haystack)
function is_admin()
function is_ajax_post(){
function is_demo_site(){
function is_from_cli(){
function is_local_asset($url)
function is_localhost(){
function is_org_admin_collections()
function is_org_admin_without_student_participant()
function is_org_admin()
function is_sys_admin()
function is_valid_state($str)
function is_valid_state($str)
function login_background()
function login_redirect($save_to_flash = true, $login_url = 'auth/login')
function minify_css($css)
function month_dropdown($attributes,  $selected='', $numeric_month = false)
function mysql_date( $date_string )
function name_to_abbr($name)
function name_to_abbr($name)
function numeral_text_from_ordinal($number){
function numeric_only($text){
function ordinal($number)
function populated_dropdown ( $name="country", $attributes=null, $top_values=[], $selection=null, $show_all=true )
function possesify($name){
function prepare_dash_microsite(&$data)
function print_array($arr, $title=NULL)
function program_has_braintree($program)
function program_has_giveaway_prizes($program_id)
function ps_get_country_abbreviations_array(){
function ps_get_state_abbrev_from_name($name){
function ps_get_states_abbreviations_array(){
function random_alphanumeric($len=8)
function reattach_ga_campaign_query($url)
function relative_time($ts){
function remove_line_breaks($string=null){
function s3_url($file_name)
function saltit($input)
function set_table( $data, $header = null, $filtered = false )
function show_corporate_matching(int $program_id)
function simple_date_offset($format, $time=NULL, $offset=NULL, $alt_format=null, $default_tz=null){
function simple_date_to_utc($format, $time=NULL, $offset=NULL){
function simple_date( $date_string, $time = null )
function slugify($text){
function state_array()
function state_array()
function state_dropdown($name='state', $selected=null, $id=null, $class=null)
function state_dropdown($name='state', $selected=NULL, $id=NULL, $class=NULL)
function stringify($input)
function submitted_by_human($load_time)
function team_member_has_program_access(int $program_id)
function unsalt($input)
function unsubscribe_link($unsubscribe_code)
function url_dec($input)
function url_enc($input)
function user_file_url($file_name)
function vimeo_url($video_location)
function word_combos ($words)
function year_dropdown($attributes, $selected='', $year_start = '', $number_of_years = 20)

```
