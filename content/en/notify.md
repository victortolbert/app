```php
<?php
Class Notify_model extends CI_Model
{


function get_notifications($vars=null){
	$user	= $this->website_model->get_user_session();
	$vars	= format_array_vals($vars, 'id_people');
	if(empty($vars['id_people']) && !empty($user['id_people'])){
		$vars['id_people']		= $user['id_people'];
	}

	$sql = "SELECT n.*,
			a.id_assignment,
			a.assignment_type,
			a.id_people,
			a.state AS `assign_state`,
			p.name_first,
			p.name_last,
			p.people_email_primary,
			p.people_phone_mobile
			FROM `ltp_notify`  AS n
			LEFT JOIN `ltp_assignments` AS a ON a.assignment_type = 'notify_to_people' AND a.id_people = '".$vars['id_people']."' AND n.id_notify = a.id_notify
			LEFT JOIN `ltp_people` AS p ON p.id_people = a.id_people
			WHERE";
			if(empty($vars['bypass_broadcast'])){
				$sql .= " ((1=1";
			}

	if(!empty($vars['id_assignment'])){

		$sql .= " AND a.id_assignment = ".$this->db->escape($vars['id_assignment']);

	}elseif(!empty($vars['id_notify'])){

		$sql .= " AND n.id_notify = ".$this->db->escape($vars['id_notify']);

	}elseif(!empty($vars['view'])){
		switch(strtolower($vars['view'])){
			case 'uncleared':
				$vars['allow_limiters']		= 1;
				$vars['state']				= null;
				$vars['notify_state_lte']	= 9;
				$vars['assign_state_lte']	= 9;
			break;
			case 'unread':
				$vars['allow_limiters']		= 1;
				$vars['state']				= null;
				$vars['notify_state_lte']	= 9;
				$vars['assign_state_lte']	= 4;
			break;
			case 'dashboard':
				$vars['allow_limiters']		= 1;
				$vars['state']				= null;
				$vars['notify_state_lte']	= 9;
				$vars['date_range_start']	= time() - (86400 * 14);
			break;

		}
	}else{
		$vars['allow_limiters']	= 1;
	}

	if(!empty($vars['allow_limiters'])){


		if(!empty($vars['id_people'])){
			$sql .= " AND a.id_people = ".$this->db->escape($vars['id_people']);
		}
		if(!empty($vars['notify_type'])){
			$sql .= " AND n.notify_type = ".$this->db->escape($vars['notify_type']);
		}

		if(empty($vars['bypass_broadcast'])){
			$sql .= " ) OR (n.is_broadcast > 0 ))";
		}

		if(!empty($vars['notify_state'])){
			$sql .= " AND n.state = ".$this->db->escape($vars['notify_state']);
		}elseif(!empty($vars['notify_state_lte'])){
			$sql .= " AND n.state <= ".$this->db->escape($vars['notify_state_lte']);
		}

		if(!empty($vars['assign_state_lte'])){
			$sql .= " AND (a.state IS NULL OR a.state <= ".$this->db->escape($vars['assign_state_lte']).")";
		}
	}elseif(empty($vars['bypass_broadcast'])){
		$sql .= "))";
	}

	$sql .= " GROUP BY n.id_notify ";

	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY n.date_add";
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

	if(!empty($vars['debug'])){
		echo '<h3>notify_model->get_notifications</h3><br />'.$sql.'<br />';
		dd($vars);
	}

	if(!empty($vars['debug_stop'])){
		echo '<h3>notify_model->get_notifications</h3><br />'.$sql.'<br />';
		exit();
	}

	if($query -> num_rows() > 0){
		$result					= $query->result_array();
		foreach($result as $key => $val){
			$result[$key]['id_notify_encoded'] 	= url_enc($val['id_notify']);
			if(!empty($val['params'])){
				$result[$key]['params']			= json_decode($val['params'], true);
			}
		}

		return $result;
	}


	return array();
}


function get_uncleared_notifications($vars=null){
	$vars 			= format_array_vals($vars, 'id_people');
	$vars['view'] 	= 'uncleared';
	$vars['debug']	= 0;

	return $this->get_notifications($vars);
}

function get_notify_icon($vars){
	$vars			= format_array_vals($vars, 'id_notify');
	if(!empty($vars['id_notify']) && empty($vars['notify_type'])){
		$vars		= $this->notify_model->get_notify($vars['id_notify']);
	}

	$vars['size'] = !empty($vars['size']) ? $vars['size'] : 'fa-2x';


	if(!empty($vars['notify_type'])){
		switch(strtolower($vars['notify_type'])){
			case 'family':
			case 'new_family':
			case 'new_families':
				return '<i class="fas fa-house-user '.$vars['size'].'"></i>';
			break;
			case 'announce_vols_new':
			case 'new_volunteer':
			case 'volunteer':
				return '<i class="fas fa-user-plus '.$vars['size'].'"></i>';
			break;
			case 'meal':
			case 'meal_upcoming':
			case 'event_meal':
			case 'meal_remind':
			case 'meal_oversee':
				return '<i class="fas fa-utensils '.$vars['size'].'"></i>';
			break;
			case 'family_update':
			case 'update_family_remind':
				return '<i class="fas fa-pen-nib '.$vars['size'].'"></i>';
			break;
			case 'need_reminder':
			case 'need':
				return '<i class="fas fa-hand-holding-heart '.$vars['size'].'"></i>';
			break;
			default:
				return '<i class="fas fa-bullhorn '.$vars['size'].'"></i>';
			break;

		}
	}

	return null;
}

function get_notify_deadline($vars){
	$vars			= format_array_vals($vars, 'id_notify');
	if(!empty($vars['id_notify']) && empty($vars['notify_type'])){
		$vars		= $this->notify_model->get_notify($vars['id_notify']);
	}




	if(!empty($vars['notify_type'])){
		switch(strtolower($vars['notify_type'])){
			case 'family':
			case 'new_family':
			case 'new_families':
				if(!empty($vars['date_add'])){
					return '<small>Added '.get_relative_time($vars['date_add']).'</small>';
				}
			break;
			case 'announce_vols_new':
			case 'new_volunteer':
			case 'volunteer':
				if(!empty($vars['date_deadline'])){
					return '<small>Over the last '.str_replace('ago', '', get_relative_time($vars['date_deadline'])).'</small>';
				}elseif(!empty($vars['date_add'])){
					return '<small>Added '.get_relative_time($vars['date_add']).'</small>';
				}
			break;
			case 'meal':
			case 'meal_upcoming':
			case 'event_meal':
			case 'meal_remind':
			case 'meal_oversee':

				$status = '<strong>'.ucwords($this->calendar_model->get_meal_event_confirmation_status($vars['params']['id_event'])).'</strong>';

				if(!empty($vars['date_deadline'])){
					return '<small>'.$status.' Due '.get_relative_time($vars['date_deadline']).'</small>';
				}
			break;
			case 'family_update':
			case 'update_family_remind':
				if(!empty($vars['params']['id_date'])){
					return '<small>Due '.get_relative_time($vars['params']['id_date']).'</small>';
				}
			break;
			case 'need_reminder':
			case 'need':
				if(!empty($vars['date_deadline'])){
					return '<small>Due '.get_relative_time($vars['date_deadline']).'</small>';
				}
			break;
			default:
				return '';
			break;

		}
	}

	return '';
}

function get_notify_action_open_link($vars){
	$vars['return_open_link']	= 1;

	return $this->get_notify_action_button($vars);
}

function get_notify_action_button($vars){
	$vars					= format_array_vals($vars, 'id_notify');
	$button 				= '';
	$url					= '';
	$link					= '<a href="#"></a>';
	$link_open				= '<a href="#">';
	$link_close				= '</a>';


	$vars['class_link']		= !empty($vars['class_link']) ? $vars['class_link'] : null;
	$vars['class_button']	= !empty($vars['class_button']) ? $vars['class_button'] : 'btn btn-primary btn-block';
	$vars['target_link']	= !empty($vars['target_link']) ? $vars['target_link'] : '';
	$vars['extra_link']		= !empty($vars['extra_link']) ? $vars['extra_link'] : '';
	$vars['extra_button']	= !empty($vars['extra_button']) ? $vars['extra_button'] : '';
	$vars['notify_name']	= !empty($vars['notify_name']) ? $vars['notify_name'] : '';
	if(!empty($vars['id_notify']) && empty($vars['notify_type'])){
		$notify		= $this->notify_model->get_notify($vars['id_notify']);
		$vars		= array_merge($vars,$notify);
	}


	if(!empty($vars['notify_type'])){
		if(empty($vars['notifiy_action'])){
			switch(strtolower($vars['notify_type'])){
				case 'announce_vols_new':
					$vars['people_ids']	= '';

					if(!empty($vars['params']['people_ids'])){
						foreach($vars['params']['people_ids'] as $id_peep){
							$vars['people_ids'] .= '&people_ids[]='.url_enc($id_peep);
						}
					}

					$url 		= base_url().'volunteers/list?custom_view=announce_vols_new'.$vars['people_ids'];

					if(!empty($vars['params']['id_church'])){
						if(stripos($vars['params']['id_church'], 'parent_') !== true){
							if($this->churches_model->is_parent_church($vars['params']['id_church'])){
								$url .=	'&limiters[id_church]=parent_'.$vars['params']['id_church'];
							}else{
								$url .=	'&limiters[id_church]='.$vars['params']['id_church'];
							}
						}else{
							$url .=	'&limiters[id_church]='.$vars['params']['id_church'];
						}
					}

					$button 	= '<a class="'.$vars['class_button'].'" href="'.$url.'" "'.$vars['extra_button'].'">View</a>';
					$link_open	= '<a class="'.$vars['class_link'].'" href="'.$url.'" target="'.$vars['target_link'].'" "'.$vars['extra_link'].'">';
					$link 		= $link_open.'View</a>';

				break;
				case 'new_families':
					$vars['family_ids']	= '';

					if(!empty($vars['params']['family_ids'])){
						foreach($vars['params']['family_ids'] as $id_family){
							$vars['family_ids'] .= '&family_ids[]='.url_enc($id_family);
						}
					}
					$url 			= base_url().'families/care-requested?sub_header=Newly+Added'.$vars['family_ids'];
					$button 		= '<a class="'.$vars['class_button'].'" href="'.$url.'" "'.$vars['extra_button'].'">View</a>';
					$link_open		= '<a class="'.$vars['class_link'].'" href="'.$url.'" target="'.$vars['target_link'].'" '.$vars['extra_link'].'>';
					$link 			= $link_open.'View</a>';

				break;
				case 'family_update':
				case 'community_update':
				case 'team_leader_update':
				case 'update_family_remind':
					if(!empty($vars['params']['id_community']) && !empty($vars['params']['id_family']) && !empty($vars['params']['id_date'])){

						$url 			= base_url().'communities/ajax_make_family_update_form?c='.url_enc($vars['params']['id_community']).'&d='.url_enc($vars['params']['id_date']);
						$button 		= '<span class="ajax-target-dash-btn-update-wrapper-'.url_enc($vars['params']['id_date']).'"><a class=" btn btn-primary btn-block btn-modal-with-ajax btn-dashboard-admin-confirm-'.url_enc($vars['params']['id_date']).'" href="#modalnotify" data-toggle="modal" data-modalheader="Family Update For Week Ending '.format_date($vars['params']['id_date'], 'dateonly').'" data-modalclass="modal-lg" data-modalhideclose="1" data-ajaxurl="'.$url.'" data-modaladdclass="modal-family-update">Send</a></span>';

						$vars['class_link'] .= ' btn-modal-with-ajax btn-dashboard-admin-confirm-'.url_enc($vars['params']['id_date']);

						$vars['extra_link']	= 'data-toggle="modal" data-modalheader="Family Update For Week Ending '.format_date($vars['params']['id_date'], 'dateonly').'" data-modalclass="modal-lg" data-modalhideclose="1" data-ajaxurl="'.$url.'" data-modaladdclass="modal-family-update"';

						$link_open		= '<a class="'.trim($vars['class_link']).'" href="#modalnotify" '.$vars['extra_link'].'>';
						$link 			= $link_open.'View</a>';
					}

				break;
				case 'event_meal':
				case 'meal_remind':
					if(!empty($vars['params']['id_event'])){
						$vars['extra_button']	= 'data-toggle="modal" data-target="#modalcalendareventdetails" data-idevent="'.$vars['params']['id_event'].'"';
						$vars['extra_link']		= 'data-toggle="modal" data-target="#modalcalendareventdetails" data-idevent="'.$vars['params']['id_event'].'"';
						$vars['class_link']		.= ' cal-details-trigger';

						$url 			= '#';
						//$button 		= '<a href="'.$url.'" data-toggle="modal" class="cal-details-trigger btn btn-primary btn-block" '.$vars['extra_button'].'>View</a>';

						$button			= '<a class=" btn btn-primary btn-block btn-modal-with-ajax btn-dashboard-event-confirm-'.url_enc($vars['params']['id_event']).'" href="#modalnotify" data-toggle="modal" data-modalheader="'.'Confirm Meal'.'" data-ajaxurl="'.base_url().'calendar/ajax_confirm_event?p='.url_enc($vars['id_people']).'&e='.url_enc($vars['params']['id_event']).'&na='.$vars['id_assignment'].'&n='.$vars['id_notify'].'">Confirm</a>';




						$link_open		= '<a class="'.trim($vars['class_link']).'" href="'.$url.'" '.$vars['extra_link'].'>';
						$link 			= $link_open.'View</a>';
					}
				break;
				case 'meal_oversee':
					if(!empty($vars['params']['id_event'])){
						switch(strtolower($this->calendar_model->get_meal_event_confirmation_status($vars['params']['id_event']))){
							case 'unconfirmed':
								$vars['extra_button']	= 'data-toggle="modal" data-target="#modalcalendareventdetails" data-idevent="'.$vars['params']['id_event'].'"';
								$vars['extra_link']		= 'data-toggle="modal" data-target="#modalcalendareventdetails" data-idevent="'.$vars['params']['id_event'].'"';
								$vars['class_link']		.= ' cal-details-trigger';

								$url 			= '#';

								$button			= '<a class=" btn btn-primary btn-block btn-modal-with-ajax btn-dashboard-event-confirm-'.url_enc($vars['params']['id_event']).'" href="#modalnotify" data-toggle="modal" data-modalheader="Send Meal Reminder" data-ajaxurl="'.base_url().'calendar/ajax_remind_event?p='.url_enc($vars['id_people']).'&e='.url_enc($vars['params']['id_event']).'&na='.$vars['id_assignment'].'&n='.$vars['id_notify'].'">Remind</a>';





								$link_open		= '<a class="'.trim($vars['class_link']).'" href="'.$url.'" '.$vars['extra_link'].'>';
								$link 			= $link_open.'View</a>';
							break;
							case 'confirmed':
								$button			= '<i class="fas fa-check"></i> Confirmed!';
							break;
						}
					}
				break;
				case 'new_features':
				case 'new_feature':
					if(!empty($vars['notify_desc'])){
						$url 					= base_url().'notifications/ajax_view_notification?n='.url_enc($vars['id_notify']);
						$vars['extra_button']	= 'data-toggle="modal" data-target="#modalnotify" data-n="'.$vars['id_notify'].'" data-modalheader="'.$vars['notify_name'].'" data-ajaxurl="'.$url.'"';
						$vars['extra_link']		= 'data-toggle="modal" data-target="#modalnotify" data-n="'.$vars['id_notify'].'" data-modalheader="'.$vars['notify_name'].'" data-ajaxurl="'.$url.'"';
						$vars['class_link']		.= ' btn-modal-with-ajax';


						$button			= '<a class=" btn btn-primary btn-block btn-modal-with-ajax" href="#modalnotify" data-toggle="modal" '.$vars['extra_button'].' >View</a>';

						$link_open		= '<a class="'.trim($vars['class_link']).'" href="#" '.$vars['extra_link'].'>';
						$link 			= $link_open.'View</a>';
					}
				break;
				case 'need_reminder':
				case 'need':
					if(!empty($vars['params']['id_need'])){
						$button = '<a href="#" data-toggle="modal" data-target="#modalcalendareventdetails" class="cal-details-trigger btn btn-primary btn-block" data-idneed="'.$vars['params']['id_need'].'">View</a>';
					}
				break;

			}
		}
	}


	if(!empty($vars['return_open_link'])){

		return $link_open;
	}

	return $button;
}

function get_notify($vars){
	$r = $this->get_notifications($vars);
	if(!empty($r[0])){
		return $r[0];
	}

	return array();
}

function mark_notify_read($vars){
	unset($vars['state']);
	$vars['mode']	= 'read';
	return $this->mark_notify($vars);
}

function mark_notify_cleared($vars){
	unset($vars['state']);
	$vars['mode']	= 'cleared';
	return $this->mark_notify($vars);
}

function mark_notify_system_cleared($vars){
	unset($vars['state']);
	$vars['mode']	= 'system_cleared';
	return $this->mark_notify($vars);
}

function mark_notify($vars){
	$r		= array();

	if(empty($vars['state']) && !empty($vars['mode'])){
		switch(strtolower($vars['mode'])){
			case 'action_required':
				$vars['state'] = 2;
			break;
			case 'read':
				$vars['state'] = 4;
			break;
			case 'action_complete':
				$vars['state'] = 5;
			break;
			case 'cleared':
				$vars['state'] = 10;
			break;
			case 'system_cleared':
				$vars['state'] = 11;
			break;
		}
	}

	if(!empty($vars['id_assignment'])){

		$r['assignment'] 		=	 $this->website_model->save_assignment(array('id_assignment' => $vars['id_assignment'], 'state' => $vars['state']));

	}elseif(!empty($vars['id_notify']) && !empty($vars['state']) && !empty($vars['id_people'])){

		$r['notify'] 			= $this->save_notification(array('id_notify' => $vars['id_notify'], 'is_people' => $vars['id_people'], 'state' => $vars['state']));

	}

	return $r;

}

function get_last_notify_generate_time($vars){
	$vars 		= format_array_vals($vars, 'id_people');
	if(!empty($vars['id_people'])){
		$notifies = $this->website_model->get_assignments(array('id_people' => $vars['id_people'], 'assignment_type' => 'notify_to_people', 'order' => 'date_add', 'order_dir' => 'DESC'));
		if(!empty($notifies[0])){
			return $notifies[0]['date_add'];
		}
	}
	return 0;
}

function generate_user_notifications($vars=null){
	$vars	= format_array_vals($vars, 'id_people');
	$r = array();
	/*** Advocates ***
	- New volunteers added
	- New families request care
	- Upcoming Events
	- CC End dates approaching
	- Family Updates completed from team members
	- Meal deliver (upcoming if assigned)


	*** Team Leaders ***
	- New volunteers added to team
	- Volunteers removed from team

	*/
	if(empty($vars['id_people'])){
		$vars['user']		= $this->website_model->get_user_session();
		if(!empty($vars['user']['id_people'])){
			$vars['id_people']	= $vars['user']['id_people'];
		}
	}

	$vars = $this->generate_notification_setup($vars);

	switch($vars['user']['highest_access_level']){
		case 35:
			$r['results']['events']		= $this->notify_model->generate_notifications_upcoming_events($vars['user']);
			$r['results']['updates'] 	= $this->notify_model->generate_notifications_family_updates($vars['user']);
		break;
		case 60:
		case 65:
		case 70:
			$r['results']['events']		= $this->notify_model->generate_notifications_upcoming_events($vars['user']);
		break;
	}

	return $r;
}

function generate_notification_setup($vars){
	if(empty($vars['user']['id_people'])){
		$vars['user']							= $this->people_model->get_person(array('id_people' => $vars['id_people']));
	}
	$vars['user']['access_levels']			= $this->security_model->get_user_access_levels($vars['id_people']);
	$vars['user']['highest_access_level']	= $this->security_model->get_highest_global_access_level($vars['user']);
	$vars['can_run']						= true;


	if(empty($vars['id_people']) && !empty($vars['user']['id_people'])){
		$vars['id_people']					= $vars['user']['id_people'];
	}elseif(!empty($vars['id_people']) && !empty($vars['id_people'])){
		$vars['id_people']					= $vars['id_people'];
	}


	if(empty($vars['id_people'])){
		$vars['can_run']	= false;
	}

	//Don't let the machine user have notifications created
	if($vars['id_people'] == 1){
		$vars['can_run']	= false;
	}

	return $vars;
}

function generate_notifications_family_updates($vars){
	$vars	= format_array_vals($vars, 'id_people');
	$vars 	= $this->generate_notification_setup($vars);


	if($vars['can_run'] && $this->security_model->is_access_level_team_leader($vars['user'])){

		if(empty($vars['community_ids']) && $this->security_model->get_scope_limit_role($vars['user']) == 'communities'){

			$vars['community_ids']	= $this->security_model->get_scope_limit_role_ids($vars['user']);

			if(!empty($vars['community_ids'])){
				$vars['community_ids']	= array_unique($vars['community_ids']);
			}
		}

		$arr_date_updates[]		= strtotime('next saturday 23:59');
		/*
		while($i < 1){
			$arr_date_updates[]	= $arr_date_updates[$i] + (86400 * 7);
			$i++;
		}
		*/

		$i = 0;

		foreach($vars['community_ids'] as $cur_comm){
			if(!empty($arr_date_updates)){
				foreach($arr_date_updates as $cur_update){
					$can_save = true;

					//Is there already a notification for this update?
					$vars['cur_notifies']	= $this->get_notifications(array('id_people' => $vars['id_people'], 'notify_type' => 'update_family_remind', 'view' => 'uncleared'));


					if(!empty($vars['cur_notifies'])){
						foreach($vars['cur_notifies'] as $cur_notify){
							if(!empty($cur_notify['params']['id_community']) && $cur_notify['params']['id_community'] == $cur_comm){
								if(!empty($cur_notify['params']['id_date']) && $cur_notify['params']['id_date'] == $cur_update){
									$can_save = false;
								}

							}
						}
					}

					if($can_save){
						//Clear any existing notifications for this family updates

						if(!empty($vars['cur_notifies'])){
							foreach($vars['cur_notifies'] as $cur_notify){
								if(!empty($cur_notify['params']['id_community']) && $cur_notify['params']['id_community'] == $cur_comm){
									$vars['results']['cur_notfies_cleared']	= $this->mark_notify_system_cleared($cur_notify);
								}
							}
						}

						$save['notify_title']		= 'Weekly Family Update Due';
						$save['notify_type']		= 'update_family_remind';
						$save['date_deadline']		= $cur_update;
						$save['params']				= json_encode(array('id_community' => $cur_comm, 'id_date' => $cur_update, 'id_family' => $this->communities_model->get_family_id_from_community_id($cur_comm)));
						$save['id_people']			= $vars['id_people'];

						$vars['results']['save_notify_update_family_remind'][]	= $this->save_notification($save);

					}
				}
			}
		}
	}

	return $vars;
}

function generate_notifications_announce_vols_new($vars){
	$vars										= format_array_vals($vars, 'id_people');
	$vars 										= $this->generate_notification_setup($vars);
	$save['params']['people_ids'] 				= array();
	$save['params']['last_run'] 				= time() - (86400 * 14);

	if($vars['can_run'] && $this->security_model->is_access_level_advocate($vars['user'])){

		$vars['admin_churches']	= $this->security_model->get_user_admin_churches($vars['user']);


		//Is there already a notification for this update?
		$vars['cur_notifies']	= $this->get_notifications(array('id_people' => $vars['id_people'], 'notify_type' => 'announce_vols_new', 'view' => 'uncleared'));


		if(!empty($vars['cur_notifies'])){
			foreach($vars['cur_notifies'] as $cur_notify){
				$save['id_notify']						= $cur_notify['id_notify'];
				if(in_array($cur_notify['params']['id_church'], $vars['admin_churches'])){
					$save['params']['people_ids']		= $cur_notify['params']['people_ids'];
					if(!empty($cur_notify['params']['last_run'])){
						$save['params']['last_run']		= $cur_notify['params']['last_run'];
					}
				}
			}
		}



		//Get current counts since last entry
		$vols									= $this->website_model->get_assignments(array('assignment_type' => 'people_to_church',
																								'id_role' => 100,
																								'date_add_gte' => $save['params']['last_run'],
																								'id_churches' => $vars['admin_churches'],
																								'debug' => 1)
																						);


		if(!empty($vols)){
			foreach($vols as $cur_vol)	{
				$save['params']['people_ids'][]	= $cur_vol['id_people'];
			}
		}

		$save['params']['people_ids']		= array_unique($save['params']['people_ids']);
		$save['params']['id_church']		= $this->churches_model->get_parent_church_id($vars['admin_churches'][0]);

		if(!empty($save['params']['people_ids'])){

			$save['notify_title']					= count($save['params']['people_ids']).' new volunteers have been added at your church!';
			$save['notify_type']					= 'announce_vols_new';
			$save['date_deadline']					= $save['params']['last_run'] ;
			$save['params']['last_run']				= time();
			$save['params']							= json_encode($save['params']);
			$save['id_people']						= $vars['id_people'];

			$vars['results']['save_notify_announce_vols_new'][]	= $this->save_notification($save);

		}
	}

	return $vars;
}

function generate_notifications_upcoming_events($vars){
	$vars			= format_array_vals($vars, 'id_people');
	$vars 			= $this->generate_notification_setup($vars);
	$access_level	= $this->security_model->get_highest_global_access_level($vars['user']);
	$i 				= 0;

	if($vars['can_run']){

		$events		= $this->events_model->get_events(array('view' => 'upcoming_all',
														'date_range_start' => time(),
														'date_range_end' => (time() + (86400 * 30)),
														'debug'=> 1,
														'order' => 'c.event_date_start',
														'order_dir'=>'asc'));



		if(!empty($events)){
			foreach($events as $cur){
				$can_save									= false;
				$cur['agenda_type']							= 'event';
				$cur['agenda_action']						= '';
				$cur['event_status']						= $this->events_model->get_event_status_from_state($cur);
				$cur['event_date_start_human']				= relative_time($cur['event_date_start']);
				$cur['id_people']							= $vars['user']['id_people'];
				$save										= array('notify_type' => 'update_family_remind', 'id_people' => $cur['id_people']);

				if(1 == 1){
					if($this->events_model->is_event_of_interest($cur)){
						$event_status_set	= false;
						switch(strtolower($cur['event_type'])){
							case 'event_meal_reg':
							case 'event_meal_extra':
							case 'event_meal':
							case 'event_meals':

								$save['notify_type']	= 'meal_remind';

								if(!empty($_SERVER['ps_site'])){
									switch(strtolower($_SERVER['ps_site'])){
										case 'demo':
											$cur['event_name']	= 'Meal - Doe';
										break;
									}
								}

								if(strtolower($cur['event_status']) == 'active' || $cur['event_state'] == 1){
									$cur['event_status']	= 'Unconfirmed';
								}

								switch($access_level){
									case 30:
									case 35:

										$cur_check 				= $cur;
										$cur_check['id_people']	= $vars['user']['id_people'];
										$cur_check['id_role']	= 80;
										$cur_check['debug']		= 1;

										if($access_level == 35 || ($access_level == 30 && !empty($this->events_model->is_person_assigned_to_event($cur_check)))){
											$save['date_deadline']				= $cur['event_date_start'];
											$save['params']						= array('id_community' => $cur['assign_id_community'], 'id_event' => $cur['id_event']);
											$can_save							= 1;
											$cur['who_attended']				= 1;
											//$cur['debug'] = 1;

											$cur['attendees']					= $this->events_model->get_event_meal_providers($cur);

											if($access_level == 35){
												$cur_check['id_role']			= 82;
												$cur['event_assign_status']		= $this->events_model->is_person_assigned_to_event($cur_check);
												$cur['event_name']				= str_replace('Meal - ', $this->calendar_model->get_display_meal_event_attendees($cur).' meal to the ', $cur['event_name']);
												$cur['event_name']				= str_replace('Meal-', $this->calendar_model->get_display_meal_event_attendees($cur).' meal to the ', $cur['event_name']);
												$save['notify_title']			= str_ireplace(' family', '', $cur['event_name']).' family';
												$save['notify_type']			= 'meal_oversee';

											}else{
												$cur['event_assign_status']		= $this->events_model->is_person_assigned_to_event($cur);
												$cur['event_name']				= str_replace('Meal - ', 'Your meal to the ', $cur['event_name']);
												$cur['event_name']				= str_replace('Meal-', 'Your meal to the ', $cur['event_name']);
												$save['notify_title']			= str_ireplace(' family', '', $cur['event_name']).' family';
											}

											if(!empty($cur['event_assign_status'])){
												switch($cur['event_assign_status']){
													case 40:
														$cur['event_status'] 	= '<i class="fas fa-check"></i> Confirmed';
													break;
													default:
														if(strtolower($cur['event_status']) == 'active' || $cur['event_state'] == 1){
															$cur['event_status'] 	= '<a class=" btn btn-primary btn-modal-with-ajax btn-dashboard-event-confirm-'.strtolower(url_enc($cur['id_event'])).'" href="#modalnotify" data-toggle="modal" data-modalheader="'.$cur['ajax_header'].'" data-ajaxurl="'.base_url().'calendar/ajax_confirm_event?p='.url_enc($cur['id_people']).'&e='.url_enc($cur['id_event']).'"><i class="fas fa-check-circle"></i> Confirm</a>';
														}
													break;
												}
											}
										}elseif($this->security_model->get_active_access_level() == 35){
											$first_reminder_offset		= $cur['event_date_start'] - (86400 * 5);
											if(strtolower($cur['event_status']) == 'unconfirmed' && $first_reminder_offset < time()){
												/*
												$cur['event_status'] = '<a class=" btn btn-primary btn-modal-with-ajax btn-dashboard-event-confirm-'.strtolower(url_enc($cur['id_event'])).'" href="#modalnotify" data-toggle="modal" data-modalheader="Send Meal Reminder" data-ajaxurl="'.base_url().'calendar/ajax_send_meal_reminder?p='.url_enc($cur['id_people']).'&e='.url_enc($cur['id_event']).'"><i class="fas fa-envelope"></i> Remind</a>';
												<a >Send Message</a>
												*/
												$cur['event_status'] = '<a class=" btn btn-primary btn-modal-with-ajax btn-dashboard-event-confirm-'.strtolower(url_enc($cur['id_event'])).'" href="#bannerformmodal" data-toggle="modal" data-target="#composemessagemodal" class="btn-msg-trigger" data-rids="'.url_enc($cur['id_people']).'" data-eid='.url_enc($cur['id_event']).'"><i class="fas fa-envelope"></i> Remind</a>';
											}else{
												$cur['event_status'] .= '<br /><small>Reminder will send on '.format_date($first_reminder_offset, 'dateonly').'</small>';
											}
											$cur['event_name']	= '<a href="#" data-toggle="modal" data-target="#modalcalendareventdetails" class="cal-details-trigger" data-idevent="'.$cur['id_event'].'">'.str_replace('Meal - ', '', $cur['event_name']).' family meal</a>';
										}
									break;

									case 60:
									case 65:
									case 70:

										$save['notify_title']			= str_replace('Meal - ', '', str_ireplace(' family', '', $cur['event_name'])).' family meal';
										$save['date_deadline']			= $cur['event_date_start'];
										$save['params']					= array('id_community' => $cur['assign_id_community'], 'id_event' => $cur['id_event']);
										$can_save						= 1;

									break;
								}


							break;
							default:
								//$cur['agenda_action']	= '<a href="#needmmodal" data-toggle="modal" data-target="#needmodal" class="btn btn-default btn-md btn-msg-trigger" data-rids=""><i class="fa fa-pencil"></i> Edit</button>';
							break;
						}

						//Is there already a notification for this update?
						$vars['cur_notifies']	= $this->get_notifications(array('id_people' => $cur['id_people'], 'notify_type' => $save['notify_type'], 'view' => 'uncleared'));


						if(!empty($vars['cur_notifies'])){
							foreach($vars['cur_notifies'] as $cur_notify){
								if(!empty($cur_notify['params']['id_community']) && $cur_notify['params']['id_community'] == $cur['assign_id_community']){
									if(!empty($cur_notify['params']['id_event']) && $cur_notify['params']['id_event'] == $cur['id_event']){
										$can_save = false;
									}

								}
							}
						}


						//Clear any old notifications for this community Meal

						if(!empty($vars['cur_notifies'])){
							foreach($vars['cur_notifies'] as $cur_notify){
								if(!empty($cur_notify['params']['id_community']) && $cur_notify['params']['id_community'] == $cur['assign_id_community']){
									if($cur_notify['date_deadline'] < time()){
										$vars['results']['cur_notifies_cleared']	= $this->mark_notify_system_cleared($cur_notify);
									}
								}
							}
						}

						if($can_save){





							$save['params']										= json_encode($save['params']);
							$vars['results']['save_notify_meal_remind'][]		= $this->save_notification($save);

						}

					}//End if is_event_of_interest
				}
			}
		}
	}

	return $vars;
}

function legacy_generate_user_notifications($vars=NULL){
	$html								= '';
	$agenda_items						= array();
	$r									= array();
	$people_ids							= array();
	$i 									= 0;
	$user								= $this->website_model->get_user_session();
	$access_level						= $this->security_model->get_active_access_level();
	if(empty($vars['agenda_count_max'])){
		$vars['agenda_count_max']		= 5;
	}



	if(!empty($vars['id_people']) && !empty($vars['user']['id_people'])){
		$id_people					= $vars['user']['id_people'];
	}elseif(!empty($vars['id_people']) && !empty($vars['id_people'])){
		$id_people					= $vars['id_people'];
	}

	if(empty($id_people)){
		$id_people = $user['id_people'];
	}

	if(empty($id_people)){
		return null;
	}

	//Don't let the machine user have notifications created
	if($id_people == 1){
		return null;
	}

	if(empty($vars['community_ids']) && $this->security_model->get_scope_limit_role() == 'communities'){
		$vars['community_ids']	= $this->security_model->get_scope_limit_role_ids();
		if(!empty($vars['community_ids'])){
			$vars['community_ids']	= array_unique($vars['community_ids']);
		}
	}

	//If Team Leader then add weekly updates as an option
	if($this->security_model->is_access_level_team_leader($user)){
		$arr_date_updates[]		= strtotime('next saturday 23:59');
		/*
		while($i < 1){
			$arr_date_updates[]	= $arr_date_updates[$i] + (86400 * 7);
			$i++;
		}
		*/

		$i = 0;

		foreach($vars['community_ids'] as $cur_comm){

			if(!empty($arr_date_updates)){
				foreach($arr_date_updates as $cur_update){
					$agenda_items[$i]['event_name']							= 'Family Update';
					$agenda_items[$i]['event_status']						= 'Unsent';
					$agenda_items[$i]['event_date_start_human']				= relative_time($cur_update);
					$agenda_items[$i]['event_date_start']					= $cur_update;
					$agenda_items[$i]['event_assigned']						= $user['id_people'];
					$agenda_items[$i]['agenda_type']						= 'admin';
					$agenda_items[$i]['agenda_action']						= '<span class="ajax-target-dash-btn-update-wrapper-'.url_enc($cur_update).'"><a class=" btn btn-primary btn-modal-with-ajax btn-dashboard-admin-confirm-'.strtolower(url_enc($cur_update)).'" href="#modalnotify" data-toggle="modal" data-modalheader="Family Update For Week Ending '.format_date($cur_update, 'dateonly').'" data-modalclass="modal-lg" data-modalhideclose="1" data-ajaxurl="'.base_url().'communities/ajax_make_family_update_form?c='.url_enc($cur_comm).'&d='.url_enc($cur_update).'"><i class="fas fa-envelope"></i> Send</a></span>';
					$agenda_items[$i]['event_status']						= $agenda_items[$i]['agenda_action'];
					$agenda_items[$i]['agenda_action']						= '';

					$i++;
				}
			}
		}

	}


	if(!empty($vars['community_ids'])){
		$needs				= $this->needs_model->get_needs(array('community_ids' => $vars['community_ids'], 'debug'=> 0, 'with_assignments' => 1, 'upcoming' => 0, 'order' => 'n.date_start', 'order_dir' => 'ASC'));
	}

	if(!empty($needs)){
		foreach($needs as $cur){
			$agenda_items[$i]['event_name']							= $cur['need_name'];
			$agenda_items[$i]['event_status']						= $this->needs_model->get_need_status_from_state($cur);
			$agenda_items[$i]['event_date_start_human']				= format_date($cur['date_start'], 'dateonly');
			$agenda_items[$i]['event_date_start']					= $cur['date_start'];
			$agenda_items[$i]['event_assigned']						= $cur['assigned'];
			$agenda_items[$i]['agenda_type']						= 'need';
			$agenda_items[$i]['agenda_action']						= '';
			$i++;
		}
	}


	$events		= $this->events_model->get_events(array('view' => 'upcoming_all',
														'date_range_start' => time(),
														'date_range_end' => (time() + (86400 * 30)),
														'debug'=> 0,
														'order' => 'c.event_date_start',
														'order_dir'=>'asc'));

	if(!empty($events)){
		foreach($events as $cur){
			$cur['agenda_type']							= 'event';
			$cur['agenda_action']						= '';
			$cur['event_status']						= $this->events_model->get_event_status_from_state($cur);
			$cur['event_date_start_human']				= relative_time($cur['event_date_start']);
			$cur['id_people']							= $id_people;

			if($i < $vars['agenda_count_max']){
				if($this->events_model->is_event_of_interest($cur)){
					$event_status_set	= false;
					switch(strtolower($cur['event_type'])){
						case 'event_meal_reg':
						case 'event_meal_extra':
						case 'event_meal':
						case 'event_meals':

						 if(!empty($_SERVER['ps_site'])){
							 switch(strtolower($_SERVER['ps_site'])){
								case 'demo':
									$cur['event_name']	= 'Meal - Doe';
								break;
							 }
						 }
							if(strtolower($cur['event_status']) == 'active' || $cur['event_state'] == 1){
								$cur['event_status']	= 'Unconfirmed';
							}

							switch($access_level){
								case 30:
								case 35:
									$cur_check 				= $cur;
									$cur_check['id_people']	= $user['id_people'];
									$cur_check['id_role']	= 80;

									if($access_level == 30 || ($access_level == 35 && !empty($this->events_model->is_person_assigned_to_event($cur_check)))){
										$cur['event_name']	= str_replace('Meal - ', 'Your meal to the ', $cur['event_name']);
										$cur['event_name']	= str_replace('Meal-', 'Your meal to the ', $cur['event_name']);
										$cur['ajax_header']	= 'Confirm '.$cur['event_name'].' family';
										$cur['event_name']	= '<a href="#" data-toggle="modal" data-target="#modalcalendareventdetails" class="cal-details-trigger" data-idevent="'.$cur['id_event'].'">'.$cur['event_name'].' family</a>';

										if($access_level == 35){
											$cur_check['id_role']	= 82;
											$cur['event_assign_status']	= $this->events_model->is_person_assigned_to_event($cur_check);

										}else{
											$cur['event_assign_status']	= $this->events_model->is_person_assigned_to_event($cur);
										}

										if(!empty($cur['event_assign_status'])){
											switch($cur['event_assign_status']){
												case 40:
													$cur['event_status'] 	= '<i class="fas fa-check"></i> Confirmed';
												break;
												default:
													if(strtolower($cur['event_status']) == 'active' || $cur['event_state'] == 1){
														$cur['event_status'] 	= '<a class=" btn btn-primary btn-modal-with-ajax btn-dashboard-event-confirm-'.strtolower(url_enc($cur['id_event'])).'" href="#modalnotify" data-toggle="modal" data-modalheader="'.$cur['ajax_header'].'" data-ajaxurl="'.base_url().'calendar/ajax_confirm_event?p='.url_enc($cur['id_people']).'&e='.url_enc($cur['id_event']).'"><i class="fas fa-check-circle"></i> Confirm</a>';
													}
												break;
											}
										}
									}elseif($this->security_model->get_active_access_level() == 35){
										$first_reminder_offset		= $cur['event_date_start'] - (86400 * 5);
										if(strtolower($cur['event_status']) == 'unconfirmed' && $first_reminder_offset < time()){
											$cur['event_status'] = '<a class=" btn btn-primary btn-modal-with-ajax btn-dashboard-event-confirm-'.strtolower(url_enc($cur['id_event'])).'" href="#modalnotify" data-toggle="modal" data-modalheader="Send Meal Reminder" data-ajaxurl="'.base_url().'calendar/ajax_send_meal_reminder?p='.url_enc($cur['id_people']).'&e='.url_enc($cur['id_event']).'"><i class="fas fa-envelope"></i> Remind</a>';
										}else{
											$cur['event_status'] .= '<br /><small>Reminder will send on '.format_date($first_reminder_offset, 'dateonly').'</small>';
										}
										$cur['event_name']	= '<a href="#" data-toggle="modal" data-target="#modalcalendareventdetails" class="cal-details-trigger" data-idevent="'.$cur['id_event'].'">'.str_replace('Meal - ', '', $cur['event_name']).' family meal</a>';
									}
								break;

								case 60:
								case 65:
								case 70:


									$cur['event_name']	= '<a href="#" data-toggle="modal" data-target="#modalcalendareventdetails" class="cal-details-trigger" data-idevent="'.$cur['id_event'].'">'.str_replace('Meal - ', '', $cur['event_name']).' family meal</a>';

								break;
							}


						break;
						default:
							//$cur['agenda_action']	= '<a href="#needmmodal" data-toggle="modal" data-target="#needmodal" class="btn btn-default btn-md btn-msg-trigger" data-rids=""><i class="fa fa-pencil"></i> Edit</button>';
						break;
					}

					$agenda_items[$i]				= $cur;
					$i++;
				}
			}
		}
	}

	if(!empty($vars['data_only'])){
		return $agenda_items;
	}

	$html .='<table class="table table-responsive table-striped table-upcoming-events" id="dashboard-table-upcoming-events"><thead><tr><th>When</th><th>Item</th><th>Status</th><th></th></tr></thead><tbody>';
	if(!empty($agenda_items)){


		foreach($agenda_items as $cur){
			$assigned		= '';
			$event_extra	= '';
			/*
			if(!empty($cur['people_phone_mobile'])){
				$cur_phone		= 	format_phone($cur['people_phone_mobile']);
			}elseif(!empty($cur['people_phone_home'])){
				$cur_phone		= 	format_phone($cur['people_phone_home']);
			}elseif(!empty($cur['people_phone_work'])){
				$cur_phone		= 	format_phone($cur['people_phone_work']);
			}else{
				$cur_phone		= '';
			}
			*/

			//$cur['avatar_code_only']	= 1;

			//$cur_edit_link		= base_url().'volunteers/edit/'.$cur['id_people_encoded'];

			//$cur_next_meal		= $this->communities_model->get_next_meal_date_for_volunteer($cur);

			switch($cur['agenda_type']){
				case 'need':
					$assign_people	= array();
					if(!empty($cur['event_assigned'])){
						foreach($cur['event_assigned'] as $cur_assign){
							if($cur_assign['assignment_type'] == 'people_to_need'){
								$assign_people[]	= $cur_assign;
							}
							if($cur_assign['assignment_type'] == 'need_to_community'){
								$event_extra	= '<br /><small>'.$this->communities_model->get_community_name($cur_assign).'</small>';
							}
						}
					}
					if(count($assign_people) > 0){
						$assigned .= ' to: ';
						foreach($assign_people as $cur_assign){
							$assigned .= '<br /><small>'.$cur_assign['name_first'].' '.$cur_assign['name_last'].'</small>';
						}
					}
					$html .= '<tr><td>'.$cur['event_date_start_human'].'</td><td>'.$cur['event_name'].$event_extra.'</td>
										<td>'.$cur['event_status'].$assigned.'</td>
										<td><a href="#needmmodal" data-toggle="modal" data-target="#needmodal" class="btn btn-default btn-md btn-msg-trigger" data-rids=""><i class="fa fa-pencil"></i> Edit</button></td>
									</tr>';
				break;
				case 'event':
				$html .= '<tr><td>'.$cur['event_date_start_human'].'</td><td>'.$cur['event_name'].$event_extra.'</td>
										<td>'.$cur['event_status'].$assigned.'</td>
										<td>'.$cur['agenda_action'].'</td>
									</tr>';
				break;
				case 'admin':
				$html .= '<tr><td>'.$cur['event_date_start_human'].'</td><td>'.$cur['event_name'].$event_extra.'</td>
										<td>'.$cur['event_status'].$assigned.'</td>
										<td>'.$cur['agenda_action'].'</td>
									</tr>';
				break;
			}

		}

	}

	$html .='</tbody></table>';

	if(!empty($vars['html_only'])){
		return $html;
	}
	$r['html']		= $html;
	$r['data']		= $agenda_items;

	return $r;

}


function save_notification($data=NULL){
	$post_check 					= $this->input->post('posted');
	$db_update 						= false;
	$debug							= null;
	$user							= $this->website_model->get_user_session();
	$arr_possible_matches			= array();


	if(empty($user['id_people'])){
		$user['id_people']		= 1;
	}

	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}

	//Backup $data to $vars before keys are stripped
	$vars						= $data;

	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_notify');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}

	$data['date_mod'] 					= time();
	$data['id_mod']						= $user['id_people'];

	if(isset($vars['force_state'])){
		$data['state']					= $vars['force_state'];
	}

	if(isset($state)){
		$data['state']					= $state;
	}elseif(!isset($data['state']) && empty($data['id_church'])){
		$data['state'] 					= 1;
	}

	if($data['state'] == 10){
		$data['id_cleared']			= $user['id_people'];
		$data['date_cleared']		= time();
	}

	//Check to update table first
	if(!empty($data['id_notify'])){


		$this->db->where('id_notify', $data['id_notify']);
		if($this->db->update('ltp_notify', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_notify']			= $data['id_notify'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['id_add']						= $user['id_people'];
		$data['date_add']					= time();

		if ($this->db->insert('ltp_notify', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_notify']			= $this->db->insert_id();
			$result['result']				= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	if(empty($vars['people_ids']) && !empty($vars['id_people'])){
		$vars['people_ids'][]	= $vars['id_people'];
	}

	if(!empty($result['result']) && empty($vars['bypass_assignments']) && !empty($vars['people_ids'])){
		foreach($vars['people_ids'] as $cur_peep){
			$result['assignments'][]	= $this->website_model->save_assignment(array('id_notify' => $result['id_notify'],
																						'id_people' => $cur_peep,
																						'assignment_type' => 'notify_to_people',
																						'state' => $data['state'],
																						'force_single_assignment' => 1)
																					);
		}
	}

	$result['data']							= $data;
	$result['debug']						= $debug;

	return $result;
 }

function can_show_dashboard_notification($vars, $running, $user, $access_level){

	switch($access_level){
		case 35:
			switch($vars['notify_type']){
				case 'meal_oversee':
					$running_key_hash 	= $this->get_running_key_hash($vars);
					if(!empty($running['counts'][$running_key_hash])){
						return false;
					}
				break;
				case 'update_family_remind':
					$running_key_hash 	= $this->get_running_key_hash($vars);
					if(!empty($running['counts'][$running_key_hash])){
						return false;
					}
				break;
			}

		break;
	}


	return true;
}

function get_running_key_hash($vars){
	$hash = '';
	$vars['notify_type']	= !empty($vars['notify_type']) ? $vars['notify_type'] : null;
	$vars['mode']			= !empty($vars['mode']) ? $vars['mode'] : $vars['notify_type'];

	if(!empty($vars['notify_type'])){
		$hash .= $vars['notify_type'];
	}

	switch($vars['mode']){
		case 'id_community':
		case 'meal_oversee':
		case 'meal_remind':
			if(!empty($vars['params']['id_community'])){
				$hash .= $vars['params']['id_community'];
			}

		break;
		default:

			if(!empty($vars['params']['id_event'])){
				$hash .= $vars['params']['id_event'];
			}

			if(!empty($vars['params']['id_community'])){
				$hash .= $vars['params']['id_community'];
			}

			if(!empty($vars['params']['id_date'])){
				$hash .= $vars['params']['id_date'];
			}

			if(!empty($vars['params']['id_family'])){
				$hash .= $vars['params']['id_family'];
			}
		break;
	}

	return hash_challenge($hash);
}

}//End Class
?>
```
