<?php
Class Signup_model extends CI_Model
{

function set_signup_role(){

}

function instantiate_signup_session(){
	
	$sess						= array('id_affiliate_signup' => null, 'last_step' => '', 'id_event' => null, 'user_role_primary'=> null, 'people' => array(), 
										'assignment_people_to_affiliate' => array(), 'assignment_people_to_event' => array(), 'assignment_people_to_church' => array());
	if(empty($_SESSION['signup'])){
		$_SESSION['signup']		= $sess;
	}else{
		$sess 					= $this->get_signup_session();
	}
	
	return $sess;
}

function clear_signup_session(){
	$_SESSION['signup']						= null;
	$_SESSION['uploaded']['profile_image']	= null;
	unset($_SESSION['signup']);
	unset($_SESSION['uploaded']['profile_image']);
	
	return true;
}

function get_signup_session(){
	
	if(!empty($_SESSION['signup'])){
		return $_SESSION['signup'];
	}
	
	return array();
}

function set_signup_session_var($vars){
	$sess = $this->get_signup_session();
	foreach($vars as $key => $val){
		$_SESSION['signup'][$key]		= $val;
		$sess[$key]						= $val;
	}
	return $sess;
	
}

function did_person_attend_qualifying_event($vars){
	$r = $this->get_persons_qualifying_event($vars);
	if(!empty($r['id_event'])){
		return true;
	}
	return false;
}
	
function get_persons_qualifying_event($vars){
	$vars				= format_array_vals($vars, 'id_people');
	$id_events			= array();
	$sess				= $this->get_signup_session();
	$statuses			= array();
	$attended_states	= array(1,40);
	
	if(!empty($sess)){
		foreach($sess as $key => $val){
			if(empty($vars[$key]) && !empty($sess[$key])){
				$vars[$key]		= $val;
			}
		}
	}
		
	if(!empty($vars['id_people'])){
		$assigns		= $this->website_model->get_assignments(array('id_people' => $vars['id_people'], 'assignment_type' => 'people_to_event', 'debug' => 0));
		
		if(!empty($assigns)){
			foreach($assigns as $cur){
				$id_events[]				= $cur['id_event'];
				$statuses[$cur['id_event']]	= $cur['state'];
			}
			
			$events = $this->events_model->get_events(array('id_events' => $id_events, 'event_types'=> 'events_qualifying_volunteer', 'allow_limiters' => 1, 'debug' => 0, 'bypass_security' => 1, 'bypass_affiliate' => 1));
			
			if(!empty($events)){
				foreach($events as $cur_event){
					if(!empty($statuses[$cur_event['id_event']])){
						if(in_array($statuses[$cur_event['id_event']], $attended_states)){
							return $cur_event;
						}
					}
				}
			}
		}
	}
	
	return array();
}

function did_person_sign_applicable_agreement($vars){
	$id_events			= array();
	$sess				= $this->get_signup_session();
	$statuses			= array();
	$attended_states	= array(1,40);
	if(empty($vars['user_role_primary'])){
		$vars['user_role_primary'] = 'default';
	}
	
	if(!empty($sess)){
		foreach($sess as $key => $val){
			if(empty($vars[$key]) && !empty($sess[$key])){
				$vars[$key]		= $val;
			}
		}
	}
		
	if(!empty($vars['id_people'])){
		if(!isset($vars['vol_agree_sign_date'])){
			$peep	= $this->people_model->get_person(array('id_people' => $vars['id_people'], 'bypass_security' => 1, 'bypass_affiliate' => 1));	
	
		}
		switch($vars['user_role_primary']){
			case 705: 
			case 706: 
			case 707: 
			case 708: 
			case 709: 
			case 710: 
			case 720: 
			case 730: 
				if(!empty($vars['agree_advocate_sign_date']) || !empty($peep['agree_advocate_sign_date'])){
					return true;
				}
			break;
			case ($vars['user_role_primary'] >= 1 && $vars['user_role_primary'] < 21): 
				if(!empty($vars['agree_family_sign_date']) || !empty($peep['agree_family_sign_date'])){
					return true;
				}
			break;
			default: //catch all volunteers
				if(!empty($vars['vol_agree_sign_date']) || !empty($peep['vol_agree_sign_date'])){
					return true;
				}
			break;
		}
	}
	return false;
}

function is_home_church_ltp($vars){
	$vars = format_array_vals($vars, 'id_church');
	
	if(!empty($vars['id_church'])){
		$r = $this->churches_model->get_church(array('id_church' => $vars['id_church'], 'bypass_affiliate' =>1, 'bypass_church' => 1));
		//TODO: Change to LTP church switch once data is moved
		if(!empty($r['state']) && $r['state'] == 40){
			return true;
		}
	}	
	
	return false;
}

function signup_get_interest_checkboxes($vars=null){
		$id_church 		= get_req_dec('id_church', $vars['id_church']);
		$id_people 		= get_req_dec('p', $vars['id_people']);
		$data			= array('people'=>array(), 'checked' => array(), 'checkboxes' => array());
			

		if(!empty($id_people)){
			
			$data['people']				= $this->people_model->get_person(array('id_people' => $id_people));
			if(!empty($data['people'])){
				$data['checkboxes']		= $this->people_model->get_interest_checkboxes(array('id_church' => $id_church, 'id_people' => $id_people, 'bypass_affiliate' => 1, 'bypass_security' => 1));
				foreach($data['checkboxes'] as $cur_key => $cur_val){
						
					if(!isset($data['people'][$cur_key])){
						$data['people'][$cur_key]	= null;
					}
					
					if(!empty($data['people'][$cur_key])){
						$data['checked'][$cur_key]	= 'checked';
					}else{
						$data['checked'][$cur_key]	= '';
					}
				}
				
				if(!empty($data['checkboxes'])){
					return  $this->people_model->make_interest_checkboxes($data['checkboxes'], $data['checked'], $data['people'], array('extras_only' => 1, 'parent_class' => 'row top10'));
				}
				
			}
		}
		return null;
}


function signup_get_nearby_events($vars){
		$r					= array('data' => array(), 'html' =>'', 'total' => 0);
		if(empty($vars['people_geo_lat']) && !empty($vars['place_lat'])){
			$vars['people_geo_lat']	= $vars['place_lat'];
		}
		if(empty($vars['people_geo_lng']) && !empty($vars['place_lng'])){
			$vars['people_geo_lng']	= $vars['place_lng'];
		}
		if(!empty($vars['people_geo_lat']) && !empty($vars['people_geo_lng'])){
			$check_event['geo_lat']					= $vars['people_geo_lat'];
			$check_event['geo_lng']					= $vars['people_geo_lng'];
			$check_event['recent_past']			= 1;
			$check_event['order']					= 'event_date_start';
			$events										= $this->events_model->get_events_near_location($check_event);
			
			if(!empty($events)){
				$r['data']		= $events;
				$r['total']		= count($events);
				$i =0;
				foreach($events as $cur){
					$cur_address	= $cur['event_address_street'].',  '.$cur['event_address_city'].', '.$cur['event_address_state'].' '.$cur['event_address_zip'];
					$cur_church		= $this->churches_model->get_church_name($cur);
					if(!empty($cur['event_location_detail'])){
						$cur_location		= $cur['event_location_detail'];
					}else{
						$cur_location = $cur_address;
					}
					
					if($i == 1){
						$striped = 'row-striped';
					}else{
						$striped = '';
					}
					if($i != 0){
						$striped .= ' top20';
					}
					$r['html'] .= '<div class="row '.$striped.'"><div class="col-xs-4 col-sm-3 col-md-2 text-center"><div class="cal-date-wrapper"><h3 class="display-4"><span class="badge badge-secondary">'.format_date($cur['event_date_start'], 'cal_date_only').'</span></h3><h5>'.strtoupper(format_date($cur['event_date_start'], 'cal_month_abrev', $cur['event_time_zone'])).'</h5></div></div><div class="col-xs-12 col-xs-8 col-md-10"><h5 class="text-center top10">'.$this->events_model->get_event_name($cur).'</h5><div class="top20 col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-4"><button type="button" class="btn btn-primary center-block btn-slide btn-slide-next" data-slide="next" data-curslide="4" data-queryadd="&e='.url_enc($cur['id_event']).'">Select</button></p></div></div></div>'."\r\n\r\n";
					$i = 1 - $i;
				}
			}else{
				$r['html'] .= '<div class="row"><h3 class="text-center">No recent events in your area were found!</h3></div>';
			}
		}
		
		$events 			= null;
		$vars				= null;
		$check_event	= null;
		unset($events);
		unset($vars);
		unset($check_event);
		
		return $r;
		
		
	
}	

function make_signup_step_icons($total, $cur){
	$r = '<p class="text-center">';
	for($i=1; $i <= $total; $i++){
		if($i <= $cur){
			$r .= '<i class="fa fa-circle"></i>';
		}else{
			$r .= '<i class="fa fa-circle-o"></i>';
		}
	} 
	$r .='</p>';
	
	return $r;
}

function signup_capture_event_id(){
	$id_event 	= null;
	$sess		= $this->get_signup_session();
		
	if(empty($sess['id_event'])){
		$sess = $this->set_signup_session_var(array('id_event' => get_req_dec('event')));
		if(!empty($sess['id_event'])){
			$event = $this->events_model->get_event(array('id_event' => $sess['id_event']));
			if(!empty($event['id_event'])){
				$sess	= $this->set_signup_session_var(array('event' => $event));
			}
		}
	}
	
	
	
	//dds($sess['id_event']);
	return $sess['id_event'];
}
	
	
function send_finish_email($vars){
	$msg_alias				= 'email_signup_confirmation';
	$sess					= $this->get_signup_session();
	
	if(empty($vars['id_affiliate_signup']) && !empty($sess['id_affiliate_signup'])){
		$vars['id_affiliate_signup'] = $sess['id_affiliate_signup'];
	}
	
	if(empty($vars['user_role_primary']) && !empty($sess['user_role_primary'])){
		$vars['user_role_primary'] = $sess['user_role_primary'];
	}
	
	if(empty($vars['user_role_primary'])){
		$vars['user_role_primary'] = 0;
	}
	
	
	
	switch($vars['user_role_primary']){
		case 10:
			$msg_alias .= '_community_volunteer_prospect';
		break;
		case 100:
			$msg_alias .= '_community_volunteer';
		break;
		case 101:
			$msg_alias .= '_community_volunteer';
		break;
		default:
			
		break;
	}
	
	dds($vars, $msg_alias);
	
	$msg_template				= $this->messages_model->get_messaging_template(array('debug' => 0, 'messaging_alias' => $msg_alias, 'id_affiliate' => $vars['id_affiliate_signup']));
	
	if(!empty($msg_template)){
		
		$can_send				= false;
		$has_sender 			= false;
		$has_body 				= false;
		$has_subject 			= false;
		$has_recipient		= false;
		$hasnt_sent			= true;
		$email						= array();
		
		$peep						= $this->people_model->get_person(array('id_people' => $vars['id_people'], 'bypass_security' => 1, 'bypass_affiliate' => 1));
		
		
		
		if(!empty($peep['id_people'])){
			$vars						= array_merge($vars, $peep);
			

			//Check to make sure this email wasn't already sent to the user
			$params 				= $this->people_model->get_people_params(array('id_people' => $vars['id_people'], 'param_type' => 'confirm_email'));
			if(!empty($params)){
				foreach($params  as $cur_param){
					foreach($cur_param['params_decoded'] as $cur_val){
						if($cur_val['id_people'] == $vars['id_people'] && $msg_alias == $cur_val['msg_alias']){
							//$hasnt_sent = false;
						}
					}
				}
			}

			if(!empty($msg_template)){
				$merge_vars														= $email;
				if(!empty($vars['id_affiliate'])){
					$merge_vars['email_id_affiliate']							= $vars['id_affiliate'];
				}else{
					$merge_vars['email_id_affiliate']							= $this->affiliates_model->get_active_affiliate_id();
				}
				$base_url														= 'https://'.$this->affiliates_model->get_affiliate_domain($merge_vars['email_id_affiliate']);
				$vars['single_use']												= 1;
				$login_key 														= $this->people_model->make_login_key($vars);
				$merge_vars['messaging_params']									= $msg_template['messaging_params'];
				$merge_vars['id_email_layout']									= $msg_template['id_email_layout'];
				$merge_vars['msg_body']											= $msg_template['messaging_body'];
				$merge_vars['messaging_subject']								= $msg_template['messaging_subject'];								
				$merge_vars['email_layout_header']								= $msg_template['email_layout_header'];
				
				//Set forced overrides
				if(!empty($vars['email_final_body'])){
					$merge_vars['msg_body']										= $vars['email_final_body'];
				}
				
				if(!empty($vars['email_final_subject'])){
					$merge_vars['messaging_subject']							= $vars['email_final_subject'];
				}
				
				$merge_vars['merge_RECIPIENT_EMAIL'] 							= format_email($vars['people_email_primary']);
				$merge_vars['merge_RECIPIENT_NAME_FIRST'] 						= format_name($vars['name_first']);
				$merge_vars['merge_RECIPIENT_NAME_LAST'] 						= format_name($vars['name_last']);
				$merge_vars['merge_RECIPIENT_NAME_FULL'] 						= format_name($vars['name_first']).' '.format_name($vars['name_last']);
				$merge_vars['merge_URL_LOGIN']									= $base_url.'/login';
				$merge_vars['merge_LINK_LOGIN']									= '<a href="'.$merge_vars['merge_URL_LOGIN'].'" target="_blank">'.$merge_vars['merge_URL_LOGIN'].'</a>';
				$merge_vars['merge_ONE_TIME_LOGIN_URL']							= $base_url.'/login/?remember=1&k='.$login_key;
				$merge_vars['merge_ONE_TIME_LOGIN_LINK']						= "\r\n".'<a href="'.$merge_vars['merge_ONE_TIME_LOGIN_URL'].'" target="_blank">'."\r\n".'Click here for one time login'."\r\n </a>.\r\n";
				if(!empty($_SESSION['signup']['password_human'])){
					$merge_vars['merge_PASSWORD_HUMAN']		= '<strong>Password:</strong> '.$_SESSION['signup']['password_human'].'<br /><small>(Remember your password is case sensitive)</small>';
				}
				
				
				
				$email['message']														= $this->emails_model->merge_email_layout($merge_vars);
				
				
				$merge_vars['messaging_body']						= $email['message'];
				$merge_vars['merge_vars']['id_recipient']			= $vars['id_people'];
				$merged				 								= $this->messages_model->merge_messaging_fields($merge_vars);	
				
				$email['message']									= $merged['messaging_body'];
				$email['subject']									= $merged['messaging_subject'];
				$email['override_from_name']						= $this->affiliates_model->get_affiliate_name(array('id_affiliate' =>$merge_vars['email_id_affiliate'], 'bypass_affiliate_state' => 1));
			}
			
			if(!empty($vars['people_email_primary'])){
				$email['to_email']			= $vars['people_email_primary'];
				$email['to_name']			= format_name($vars['name_first']).' '.format_name($vars['name_last']);
				
				$has_sender					= true;
				$has_recipient				= true;
			}else{
				$r['msg']	= 'No valid email address to receive the test message.';
				$r['code']	= 'error_no_valid_email';
				$can_send 	= false;
			}
			
			if(!empty($email['subject'])){
				$has_subject				= true;
			}elseif(!empty($msg_template['messaging_subject'])){
				$email['subject'] 			= $msg_template['messaging_subject'];	
				$has_subject				= true;
			}else{
				$r['msg']	= 'No email subject set.';
				$r['code']	= 'error_no_email_subject';
				$r['html']	 = 'No email subject could be found.';
				$r['class'] = 'alert-warning';
				$can_send 	= false;
			}
			
			if(!empty($email['message'])){
				$has_body		= true;
			}else{
				$r['msg']		= 'No email body set.';
				$r['html']		= 'No email body could be found.';
				$r['code']		= 'error_no_email_subject';
				$r['class'] 	= 'alert-warning';
				$can_send 		= false;
			}
			
			if($has_sender && $has_body && $has_subject && $has_recipient && $hasnt_sent){
				$can_send = true;
			}

			if($can_send){
				$r['data']	= $this->emails_model->send_ltp_email($email);
				if($r['data']['status']	== 1){
					$r['st']	= 1;
					$r['msg']	= 'messages sent succesfully';
					$r['html']	= 'Your messages was sent succesfully! <br /><small>Please keep in mind that all merge fields may not merge properly in the test message.</small>';
					$r['code']	= 'success_msg_sent';
					$r['class'] = 'alert-success';
					$r['email']	= $email;
				}else{
					$r['msg']	= 'transport error sending messaging';
					$r['html']	= 'Whoops, there was an error sending you message. Please try again.';
					$r['code']	= 'error_transport';
					$r['class'] = 'alert-warning';
					$r['email']	= $email;
				}
				$arr_send_log[] = array('id_people' => $vars['id_people'], 'date_sent' =>time(), 'msg_alias' => $msg_alias);
				$data['result_assign_params']			= $this->people_model->save_people_param(array('id_people' => $vars['id_people'],
																										'state' => 1,
																										'param_link' => 'people',
																										'param_type' => 'confirm_email',
																										'param_value' =>  json_encode($arr_send_log)));
				$data['email']	= $r;
				
				return $data;
			}
		}
	}
}

function get_session_assignment_id($vars){
	$vars 	= format_array_vals($vars, 'assignment_type');
	$sess 	= $this->get_signup_session();
	$key	= ''; 
	if(!empty($vars['assignment_type'])){
		$key		= 'assignment_'.$vars['assignment_type'];
	}
	
	if(!empty($key)){
		if(!empty($sess[$key]['id_assignment'])){
			return $sess[$key]['id_assignment'];
		}
	}
	
	return null;
}

function set_session_assignment($assign_type, $vars){

	$sess = $this->set_signup_session_var(array('assignments' => array($assign_type => $vars)));
	
	return $sess;
}

function get_new_church_select($vars=null){
	$sess		= $this->get_signup_session();
	$html 		= '';
	$search 	= array('lat' => '', 'lng' => '');
	
	if(!empty($vars['church_name'])){
		$sess['church_new']['name']	= $vars['church_name'];
	}
	
	if(!empty($vars['assist_lat']) && !empty($vars['assist_lng'])){
		$search['lat']			= $vars['assist_lat'];
		$search['lng']			= $vars['assist_lng'];
	}elseif(!empty($sess['people']['people_geo_lat']) && !empty($sess['people']['people_geo_lng'])){
		$search['lat']			= $sess['people']['people_geo_lat'];
		$search['lng']			= $sess['people']['people_geo_lng'];
	}elseif(!empty($sess['people']['place_lat']) && !empty($sess['people']['place_lng'])){
		$search['lat']			= $sess['people']['place_lat'];
		$search['lng']			= $sess['people']['place_lng'];
	}
	
	
	if(!empty($sess['church_new']['name']) && !empty($search)){
		$search['search']		= $sess['church_new']['name'];
		$search['type']			= 'church';
		$search['debug']		= 0;
		$matches 				= $this->places_model->get_place_by_keyword_search($search);
		
		if(!empty($matches)){
			$html .= '<table class="table table-responsive table-striped"><tbody>';
			foreach($matches as $match){
				$html .='<tr><td class="col-sm-2 col-xs-2" valign="middle" align="center"><input class="" type="radio" name="id_church_place" value="'.$match['place_id'].'"></div>';
				$html .= '<td class="col-sm-10 col-xs-10"><strong>'.$match['name'].'</strong><br /><small>'.$match['vicinity'].'</small></td></tr>';
			}
		}
	}
	$html .='<tr><td class="col-sm-2 col-xs-2" valign="middle" align="center"><input class="" type="radio" name="id_church_place" value="-1"></div>';
	$html .= '<td class="col-sm-10 col-xs-10"><strong>My chuch is not listed</strong><br /><small><p>&nbsp;</p></small></td></tr>';
	$html .= '</tbody></table>';
	return $html;
	
}

function get_check_user_entered_church($vars=null){
	$vars 					= format_array_vals($vars, 'church_name');
	$html 					= '';
	$data					= array();
	$msg  					= 'Error: No potential church names were found';
	$st						= 0;
	$title 					= 'No Matches';
	$church_name 			= get_req('church_name', $vars['church_name']);
	
	$html .= '<p class="text-center top20"><select id="id_church_verified" name="id_church_verified" class="form-control">';
		//Check to see if church name was submitted
		if(!empty($church_name)){
			$potential_churches	= $this->churches_model->get_churches(array('search_match' => $church_name, 'debug' => 0, 'bypass_affiliate' => 1, 'group_churches' =>1));
		}
		if(empty($potential_churches)){
			$potential_churches	= $this->churches_model->get_churches(array('search_match_deep' => $church_name, 'debug' => 0, 'bypass_affiliate' => 1, 'group_churches' =>1));
		}
		if(!empty($potential_churches)){
				//$html = '<h4>Did you mean one of these churches?</h4>';
				//$html.='<p>It looks like that church might already be in the system. We just want to confirm that you will be associated with the correct church</p>';
				//$html .= '<p>If your church is not on this list then just select the option that says; "My church is not on this list".</p>';
				
			foreach($potential_churches as $cur){
				$cur['show_church_city_state']	= 1;
				$html .= '<option value="'.$cur['id_church'].'">'.$this->churches_model->get_church_name($cur).'</option>';
			}
			
			$title 	= 'We Found a Potential Church Match';

		}
	$html .= '<option value="-1">My church is not on this list.</option>';
	$html .= '</select></p>';
	
	return $html;
}

function set_checked_house_ccroles($vars){
	$sess	= $this->get_signup_session();
	$arr		= array('interest_team_leader', 'interest_family_helper', 'interest_child_mentor', 'interest_interim_caregiver');

	if(!empty($sess['people']['id_people'])){
		$peep = $this->people_model->get_person(array('id_people' => $sess['people']['id_people']));
		
		if(!empty($peep['id_people'])){
			foreach($arr as $cur){
				if(!empty($peep[$cur])){
					$vars[] = 'ps_house_check_'.$cur;
				}
			}
		}
	}		
	//dds($vars);
		return $vars;
}

function get_steps_to_remove($sess, $step, $removed_steps=array()){
	//$r['data']['remove']['ids']
	if(empty($sess['people']['id_people'])){
		$sess = $this->get_signup_session();
	}
	if(!empty($sess['people']['id_people'])){
		$peep = $this->people_model->get_person(array('id_people' => $sess['people']['id_people'], 'bypass_affiliate' => 1));
	}
	
	//Has Signup Set
	if(!empty($sess['set']['id_signup_set'])){
		$steps_hidden	= explode(',',$sess['set']['steps_hidden']);
		if(!empty($steps_hidden)){
			foreach($steps_hidden as $cur_hidden){
				$removed_steps[]	= $cur_hidden;
			}
		}
	}
	
	//Has Event
	if(!empty($sess['event'])){
		switch(strtolower($sess['event']['event_type'])){
			case 'event_awareness':
				$removed_steps[]			= $this->signup_model->set_removed_step('item-step-psrole');
				$removed_steps[]			= $this->signup_model->set_removed_step('item-step-event');
				$removed_steps[]			= $this->signup_model->set_removed_step('item-step-agreement');
				$removed_steps[]			= $this->signup_model->set_removed_step('item-step-avatar');
			break;
			case 'event_training':
			case 'event_combined':
				$removed_steps[]			= $this->signup_model->set_removed_step('item-step-event');				
			break;
		}
	}
	
	//Has Care Community Role
	if(!empty($sess['community']['id_community'])){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-psrole');
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-ccroles');
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-interests');
	}
	
	//Does the home church have LTP
	if(!empty($sess['home_church_has_ltp']) && !in_array($step, array('servingchurch', 'item-step-servingchurch'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-servingchurch');
	}
	
	//Does the selected church have any extr interests
	if(!empty($sess['church_has_no_interests']) && !in_array($step, array('interests', 'item-step-interests'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-interests');
	}
	
	//Attended a qualifying event?
	if(!empty($sess['attended_qualifying_event']) && !in_array($step, array('event', 'item-step-event'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-event');
	}
	
	//Signed applicable agreement?
	if(!empty($sess['signed_applicable_agreement']) && !in_array($step, array('agreement', 'item-step-agreement'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-agreement');
	}
	
	//Has a working avatar?
	if(!empty($sess['has_avatar']) && !in_array($step, array('avatar', 'item-step-avatar'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-avatar');
	}
	
	//Has matching home church?
	if(!empty($sess['has_matching_home_church']) && !in_array($step, array('newchurch','selectchurch','item-step-selectchurch','item-step-newchurch'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-selectchurch');
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-newchurch');
	}

	//Has selected home church?
	if(!empty($sess['has_selected_home_church']) && !in_array($step, array('selectchurch', 'item-step-selectchurch'))){
		$removed_steps[]			= $this->signup_model->set_removed_step('item-step-selectchurch');
	}
	
	//Set assignment settings
	switch($sess['user_role_primary']){
		case 10:
		case 20:
			$removed_steps[]		= $this->signup_model->set_removed_step('item-step-event');
			$removed_steps[]		= $this->signup_model->set_removed_step('item-step-avatar');
			$removed_steps[]		= $this->signup_model->set_removed_step('item-step-interests');
			$removed_steps[]		= $this->signup_model->set_removed_step('item-step-servingchurch');
			$removed_steps[]		= $this->signup_model->set_removed_step('item-step-ccroles');
		break;
	}
	
	return array_unique($removed_steps);
}

function reset_removed_step_options($step){
	$sess 		= $this->get_signup_session();
	
	
	if(!empty($sess['people']['id_people'])){
		switch(strtolower($step)){
			case 'info':
			case 'item-step-info':
			//dds($sess);
				$sess							= $this->set_signup_session_var(array('has_matching_home_church' => 0));
				$sess							= $this->set_signup_session_var(array('has_selected_home_church' => 0));
				$r['peep'] 						= $this->people_model->simple_save_people(array('id_people' => $sess['people']['id_people'], 'id_home_church' => 0, 'home_church' => '', 'id_church_add' => 0));
				$peep							= $this->people_model->get_person(array('id_people' => $sess['people']['id_people']));
				$sess							= $this->signup_model->set_signup_session_var(array('people' => $peep));
				$data['id_assignment']			= $this->get_session_assignment_id('people_to_church');
				if(!empty($data['id_assignment'])){
					$r['assignment_people_to_affiliate']	= $this->website_model->save_assignment(array('id_assignment' => $data['id_assignment'], 'id_affiliate' => $sess['id_affiliate_signup'], 'id_church' => 0));
				}
			break;
			case 'selectchurch':
				$sess	= $this->signup_model->set_signup_session_var(array('has_matching_home_church' => 0));
			break;
			case 'event':
				$sess	= $this->signup_model->set_signup_session_var(array('event_qualify' => 0));
			break;
		}
	}
		
	return $sess;
	
}

function set_removed_step($step){
	$sess 						= $this->get_signup_session();
	$sess['removed_steps'][]	= $step;
	$sess['removed_steps']		= array_unique($sess['removed_steps']);
	
	$sess 						= $this->set_signup_session_var(array('removed_steps' => $sess['removed_steps']));
	
	return $step;
	
}

function get_removed_steps($vars=null){
	$r		= array();
	$sess 	= $this->get_signup_session();
	
	if(!empty($sess['removed_steps'])){
		$r	=  $sess['removed_steps'];
	}	
	
	if(!empty($vars)){
		if(is_array($vars)){
			foreach($vars as $cur){
				$r[] = $cur;
			}
		}else{
			$r[]	= $vars;
		}
	}
	
	return $r;
}

function set_signup_set_params(){
	$data['id_signup_set']	= get_req_dec('set');
	$sess					= $this->signup_model->instantiate_signup_session();
	if(!empty($data['id_signup_set'])){
		$data['set']	= $this->get_signup_set($data);
		
		$r = $this->set_signup_session_var(array('set' => $data['set']));
		return $data['set'];
	}
	
	return array('set_type' => 'default');
	
}

function get_signup_sets($vars=null){
	$sql = "SELECT 	s.*, 
					c.church_name, 
					c.campus_name,
					cp.place_name,
					cp.place_street_number,
					cp.place_street,
					cp.place_city,
					cp.place_county,
					cp.place_state,
					cp.place_zip,
					cp.place_zip,
					cp.place_country,
					cp.place_lat,
					cp.place_lng,
					cp.place_time_zone,
					a.affiliate_name,
					a.affiliate_address_state,
					a.affiliate_address_zip
	FROM `ltp_signup_sets` AS s 
	LEFT JOIN `ltp_churches` AS c ON c.id_church = s.id_church
	LEFT JOIN `ltp_places` AS cp ON cp.id_place = c.id_place
	LEFT JOIN `ltp_affiliates` AS a ON a.id_affiliate = s.id_affiliate
	WHERE 1=1 ";
	
	if(!empty($vars['id_signup_set'])){
		$sql .= " AND s.id_signup_set =  ".$this->db->escape($vars['id_signup_set']);
	}else{
		$vars['allow_limiters'] = 1;
	}
	
	if(!empty($vars['allow_limiters'])){
		if(!empty($vars['id_church'])){
			$sql .= " AND s.id_church =  ".$this->db->escape($vars['id_church']);
		}
		if(!empty($vars['id_event'])){
			$sql .= " AND s.id_event =  ".$this->db->escape($vars['id_event']);
		}	
		
		if(empty($vars['bypass_affiliate'])){
			if(!empty($vars['id_affiliate'])){
				$sql .= " AND s.id_affiliate =  ".$this->db->escape($vars['id_affiliate']);
			}elseif(!empty($_SESSION['affiliate']['id_affiliate']) && !$this->security_model->user_has_access(95)){
				$sql .= " AND s.id_affiliate =  ".$this->db->escape($_SESSION['affiliate']['id_affiliate']);
			}
		}
	}
	
	if(isset($vars['state'])){
		$sql .= " AND s.state = ".$this->db->escape($vars['state']);
	}else{
		$sql .= " AND s.state > 0";
	}
	
	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY s.id_signup_set";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$vars['order_dir'];
	}else{
		$sql .= " DESC";
	}
	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}else{
		$sql .= " LIMIT 0,2000";
	}
	
	$query = $this->db->query($sql,false);
	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>calendar_model->get_calendar: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>calendar_model->get_calendar: </strong>'.$sql.'</p>';
	}
	

   if($query -> num_rows() > 0){
	   
		$r = $query->result_array();
	
		foreach($r as $key => $val){
			$r[$key]['id_event_encoded']		= url_enc($r[$key]['id_event']);
		}
		
		
		return $r;
	 
   }else{
		return null;
   }
}

function get_signup_set($vars){
	$r = $this->get_signup_sets($vars);
	
	if(!empty($r)){
		return $r[0];
	}
	return array();
}

function make_awareness_interest_checkboxes($vars){
	$i = 0;
	$r = '<div class="col-sm-1"></div><div class="col-sm-11">';
	
	
	
	if(!empty($vars['event_type'])){
		switch(strtolower($vars['event_type'])){
			
			case 'event_awareness_church':
			case 'event_awareness':
				$arr_params	= array('care_communities' => 'Care Communities',
									'loaves_and_fishes' => 'A Loaves & Fishes Event',
									'prayer_team' => 'The Prayer Team',
									'church_advocate_team' => 'The Church Advocate Team',
									'become_foster_or_adoptive' => 'Becoming a Foster or Adoptive Family'
								);
			break;
			case 'event_awareness_cross_affiliate':
			if(empty($vars['id_affiliate']) && !empty($vars['id_affiliate_signup'])){
				$vars['id_affiliate']	= $vars['id_affiliate_signup'];
			}
			if(empty($vars['id_affiliate'])){
				$vars['id_affiliate'] = $this->affiliates_model->get_active_affiliate_id();
			}
			
			$affiliate		= $this->affiliates_model->get_affiliate(array('id_affiliate' => $vars['id_affiliate']));
			
			
			
				$arr_params	= array('church_advocate_clinics' => 'Church Advocate Clinics',
									'service_projects' => 'Service Projects',
									'hosting_events' => 'Hosting Events',
									'adoption_101' => 'Adoption 101',
									'dedicated_prayer' => 'Dedicated Prayer',
									'consult_call' => 'Schedule a Consulting Call'
								);
								
				if(!empty($affiliate['allow_interest_care_portal'])){
					$arr_params['care_portal'] = 'CarePortal';
				}
			
			break;
		
		}
		
		if(!empty($arr_params)){
			foreach($arr_params as $key => $val){
				$r .= '
					<div class="row top10 xs-top10">
						<div class="col-sm-3 col-xs-4">
							<input type="checkbox" name="people_param_response_awareness_interest[]" class="btn-switch" data-on-text="Yes" data-off-text="No" data-off-color="danger" data-on-color="success" value="'.$key.'">
							<input type="hidden" name="people_param_response_awareness_interest[]_prev" value="">
						</div>
						<div class="col-sm-9 col-xs-8">'.$val.'</div>
					</div>';
				$i++;
			}
		}
	}
	
	$r .= '</div>';
	
	return $r;
	
}

}//End Class
?>
