```php
<?php
Class Needs_model extends CI_Model
{
 function get_needs($vars=null){

	if(empty($vars['role_scope'])){
		$vars['role_scope']	= null;
	}

	$sql = "SELECT n.*,
				n.state AS `need_state`,
				a.assignment_type,
				a.id_assignment,
				a.id_affiliate AS `assign_id_affiliate`,
				n.date_add AS `need_date_add`
		FROM `ltp_needs` AS n
		LEFT JOIN `ltp_assignments` AS a ON n.id_need = a.id_need
		WHERE n.`id_need` > '0'";

	if(!empty($vars['id_need'])){
		$sql .= " AND n.id_need =  ".$this->db->escape($vars['id_need']);
	}else{

		if(!empty($vars['id_community'])){
			$sql .= " AND a.id_community =  ".$this->db->escape($vars['id_community'])." AND a.`assignment_type` = 'need_to_community'";
		}elseif(!empty($vars['community_ids'])){
			if(is_array($vars['community_ids'])){
				$vars['community_ids'] = implode(',',$vars['community_ids']);
			}
			$sql .= " AND a.id_community IN (".$vars['community_ids'].") AND a.`assignment_type` = 'need_to_community'";
		}

		if(!empty($vars['need_ids'])){
			if(is_array($vars['need_ids'])){
				$vars['need_ids'] = implode(',',$vars['need_ids']);
			}
			$sql .= " AND n.id_need IN (".$vars['need_ids'].")";
		}

		if(!empty($vars['id_role'])){
			$sql .= " AND a.id_role =  ".$this->db->escape($vars['id_role']);
		}
		if(!empty($vars['id_family'])){
			$sql .= " AND a.id_family =  ".$this->db->escape($vars['id_family']);
		}
		if(!empty($vars['event_key'])){
			$sql .= " AND n.event_key =  ".$this->db->escape($vars['event_key']);
		}
		if(!empty($vars['id_church'])){
			if(strpos($vars['id_church'], 'parent_') !== false){
				$vars['id_church']			= str_replace('parent_', '', $vars['id_church']);
				$possible_church_ids		= $this->churches_model->get_all_campus_church_ids(array('id_church_parent' => $vars['id_church'], 'include_parent' => 1));

				if(!empty($possible_church_ids)){
					$possible_church_ids	= implode(',',$possible_church_ids);
					$sql .= " AND ((a.id_church IN (".$possible_church_ids.") AND a.state > '0') OR n.id_church_claim IN (".$possible_church_ids."))";
				}else{
					$sql .= " AND ((a.state > '0' AND a.id_church =  ".$this->db->escape($vars['id_church']).") OR n.id_church_claim IN (".$this->db->escape($vars['id_church'])."))";
				}

			}else{
				$sql .= " AND ((a.state > '0' AND a.id_church =  ".$this->db->escape($vars['id_church']).") OR n.id_church_claim = ".$this->db->escape($vars['id_church']).")";
			}
		}elseif(!empty($vars['force_non_staff_primary_church']) && !empty($_SESSION['logged_in']['id_home_church']) && !$this->security_model->user_has_access(80)){
			$sql .= " AND a.id_church = ".$this->db->escape($_SESSION['logged_in']['id_home_church']);
			if(empty($_SESSION['view_limiter']['id_church'])){
				$_SESSION['view_limiter']['id_church']	= $_SESSION['logged_in']['id_home_church'];
			}
		}
		if(!empty($vars['upcoming'])){
			$sql .= " AND n.date_start >  ".$this->db->escape(date_offset(time()));
		}
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND a.id_affiliate =  ".$this->db->escape($vars['id_affiliate']);
		}elseif(!empty($_SESSION['affiliate']['id_affiliate']) && !$this->security_model->user_has_access(95)){
			$sql .= " AND a.id_affiliate =  ".$this->db->escape($_SESSION['affiliate']['id_affiliate']);
		}
		if(isset($vars['state'])){
			$sql .= " AND n.state = ".$this->db->escape($vars['state']);
		}else{
			$sql .= " AND n.state > 0";
		}
		if(!empty($vars['last_update'])){
			$sql .= " AND n.date_mod >=  ".$this->db->escape($vars['last_update']);
		}

		$sql .= " GROUP BY n.id_need";

	}

	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$this->db->escape($vars['order']);
	}else{
		$sql .= " ORDER BY n.date_start";
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
		echo '<p><strong>Need Query: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>Need Query: </strong>'.$sql.'</p>';
	}

	if(is_object($query)){

	   if($query->num_rows() > 0){

			$r = $query->result_array();

			foreach($r as $key => $val){
				$r[$key]['id_need_encoded']		= url_enc($val['id_need']);
				$need_ids[]						= $r[$key]['id_need'];
				if(!empty($vars['with_assignments'])){
					$r[$key]['assigned']			= array();
				}
			}

			if(!empty($vars['with_assignments']) && !empty($need_ids)){
				$need_ids_flat		= implode(',',$need_ids);
				$assignments		= $this->get_assignments(array('need_ids' => $need_ids_flat, 'no_msgs' => 1, 'role_scope' => $vars['role_scope'], 'debug' => 0));


				if(!empty($assignments) && count($assignments) > 0){
					foreach($assignments as $cur_assign){
						$cur_id_need						= $cur_assign['id_need'];
						$assigned[$cur_id_need][]			= $cur_assign;
					}
					foreach($r as $key => $val){
						$cur_id_need						= $r[$key]['id_need'];
						if(!empty($assigned[$cur_id_need])){
							$r[$key]['assigned']			= $assigned[$cur_id_need];
						}
					}
				}
			}

			return $r;
	   }
	}

	return null;
 }

function get_need($vars=null){

	$result = $this->get_needs($vars);


   if(!empty($result)){
	   $r = $result[0];
     return $r;

   }else{
     return false;
   }
 }

 function get_need_types($vars=null){

	if(empty($vars['role_scope'])){
		$vars['role_scope']	= null;
	}

	$sql = "SELECT n.*, c.ordering, c.need_type_cat_name FROM `ltp_need_types` AS n LEFT JOIN `ltp_need_type_cats` AS c ON c.id_need_type_cat = n.id_need_type_cat WHERE 1=1";

	if(!empty($vars['id_need_type'])){
		$sql .= " AND n.id_need_type =  ".$this->db->escape($vars['id_need_type']);
	}

	if(!empty($vars['access_level_min'])){
		$sql .= " AND n.access_level_min >=  ".$this->db->escape($vars['access_level_min']);
	}
	if(!empty($vars['access_level_max'])){
		$sql .= " AND n.access_level_max <=  ".$this->db->escape($vars['access_level_max']);
	}
	if(!empty($vars['for_families_existing'])){
		$sql .= " AND n.for_families_existing =  ".$this->db->escape($vars['for_families_existing']);
	}
	if(!empty($vars['for_families_new'])){
		$sql .= " AND n.for_families_new =  ".$this->db->escape($vars['for_families_new']);
	}

	if(isset($vars['state'])){
		$sql .= " AND n.state = ".$this->db->escape($vars['state']);
	}else{
		$sql .= " AND n.state > 0";
	}
	if(!empty($vars['last_update'])){
		$sql .= " AND n.date_mod >=  ".$this->db->escape($vars['last_update']);
	}

	$sql .= " GROUP BY n.id_need_type";

	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$this->db->escape($vars['order']);
	}else{
		$sql .= " ORDER BY c.ordering, c.need_type_cat_name, n.need_type_name";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$vars['order_dir'];
	}else{
		$sql .= " ASC";
	}
	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}else{
		$sql .= " LIMIT 0,2000";
	}


	$query = $this->db->query($sql,false);


	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>need_model->get_need_types: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>need_model->get_need_types: </strong>'.$sql.'</p>';
	}

	if(is_object($query)){

	   if($query->num_rows() > 0){

			$r = $query->result_array();

			if(!empty($vars['associated'])){
				foreach($r as $cur){
					$cur_id_need		= $cur['id_need_type'];
					$n[$cur_id_need]	= $cur;
				}

				return $n;
			}

			return $r;
	   }
	}

	return null;
 }

function get_need_type($vars=null){

	$result = $this->get_need_types($vars);


   if(count($result) > 0){
	   $r = $result[0];
     return $r;

   }else{
     return false;
   }
 }

 function get_need_types_associated($vars){

	if(!empty($_SESSION['needs_types_associated']) && empty($vars['force_lookup'])){
		  $needs_associated							= $_SESSION['needs_types_associated'];
	 }else{
		  $needs_associated							= $this->get_need_types(array('associated' => 1));
		  $_SESSION['needs_types_associated']		= $needs_associated;
	 }

	 return $needs_associated;
 }

function get_need_type_icon($vars){
	$r 						= array('need_type_icon' => null);
	$needs_associated		= $this->get_need_types_associated($vars);


	if(!empty($needs_associated)){
		if(!empty($vars['id_need_type'])){
			$id_need_type	= $vars['id_need_type'];
			$r 				= $needs_associated[$id_need_type];
		}elseif(!empty($vars['need_type_slug'])){
			foreach($needs_associated as $cur){
				if(strtolower($vars['need_type_slug']) == strtolower($cur['need_type_slug'])){
					$r = $cur;
				}
			}
		}
	}

	return $r['need_type_icon'];
}

 function save_need($data=NULL){
	$post_check 				= $this->input->post('posted');
	$db_update 				= false;
	$password				= null;
	$reset_password 		= false;
	$debug						= null;
	$user						= array();


	if(!empty($_SESSION['logged_in'])){
		$user					= $_SESSION['logged_in'];
	}

	if(empty($user['id_people'])){
		$user['id_people']		= 1;
	}

	if(empty($data) && isset($post_check)){
		$data 			= $this->input->post();
	}

	//Backup initial variables
	$vars					= $data;

	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_needs');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}

	//check to see if need already exists
	if(empty($data['id_need']) && !empty($data['old_event_key'])){
		$cur_need = $this->get_need(array('event_key' => $data['old_event_key']));
		if(!empty($cur_need['id_need'])){
			$data['id_need']	= $cur_need['id_need'];
		}
	}

	if(empty($data['id_need']) && !empty($data['event_key'])){
		$cur_need = $this->get_need(array('event_key' => $data['event_key']));
		if(!empty($cur_need['id_need'])){
			$data['id_need']	= $cur_need['id_need'];
		}
	}





	$data['date_mod'] 			= time();

	if(!isset($data['state'])){
		$data['state'] 				= 1;
	}


	//Check to update table first
	if(!empty($data['id_need'])){

		$this->db->where('id_need', $data['id_need']);
		if($this->db->update('ltp_needs', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_need']				= $data['id_need'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['date_add'] 					= time();


		if ($this->db->insert('ltp_needs', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_need']				= $this->db->insert_id();
			$result['result']				= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['debug']						= $debug;

	if($result['db_update']){
		$assign['id_need']						= $result['id_need'];
		$assign['assignment_type']				= 'need_to_affiliate';
		$assign['force_single_assignment']		= 1;
		if(!empty($vars['id_affiliate'])){
			$assign['id_affiliate']				= $vars['id_affiliate'];
		}else{
			$assign['id_affiliate']				= $this->affiliates_model->get_active_affiliate_id();
		}
		$result['assignments'][]				= $this->website_model->save_assignment($assign);

		//Save community assignment
		if(empty($vars['bypass_save_assign_community'])){
			if(!empty($vars['id_community'])){
				$assign['assignment_type']		= 'need_to_community';
				$assign['id_community']			= $vars['id_community'];
				$result['assignments'][]		= $this->website_model->save_assignment($assign);
			}
		}

		//Save need organizer(s)
		if(empty($vars['bypass_save_assign_organizer'])){
			if(!empty($vars['id_community'])){
				$assign							= array();
				$assign['assignment_type']		= 'people_to_need';
				$assign['id_role']				= 104; //need organizer role
				$assign['id_need']				= $result['id_need'];
				$assign['id_need_organizers']	= !empty($vars['id_need_organizers']) ? $vars['id_need_organizers'] : $user['id_people'];

				if(!is_array($assign['id_need_organizers'])){
					if(stripos($assign['id_need_organizers'], ',') !== false){
						$assign['id_need_organizers']	= explode(',',$assign['id_need_organizers']);
					}else{
						$assign['id_need_organizers']		= array($assign['id_need_organizers']);
					}
				}

				foreach($assign['id_need_organizers'] as $assign['id_people']){
					$result['assignments'][]		= $this->website_model->save_assignment($assign);
				}
			}
		}

		if(empty($vars['bypass_save_event'])){
			if(!empty($vars['need_date_start_human']) && !empty($vars['need_time_start_human'])){
				$event['event_name']			= $this->make_event_name_from_need($vars);
				$event['event_desc']			= !empty($data['need_desc']) ? $data['need_desc'] : null;
				$event['event_date_start']		=  date_to_utc(strtotime($vars['need_date_start_human'].' '.$vars['need_time_start_human']), 'unix', null, 1);
				$event['event_type']			=  'event_need';
				$event['event_time_zone']		= $this->website_model->get_user_time_zone();
				$event['event_state']			= 10;
				$event['params']				= json_encode(array('need' => 'id_need'));
				$result['event']				= $this->events_model->save_event($event);
				if(!empty($result['event'])){
					unset($assign['id_role']);
					$assign['assignment_type']	= 'event_to_need';
					$assign['id_event']			= $result['event']['id_event'];
					$result['assignments'][]	= $this->website_model->save_assignment($assign);

					if(!empty($vars['id_community'])){
						unset($assign['id_need']);
						$assign['assignment_type']	= 'event_to_community';
						$assign['id_community']		= $vars['id_community'];
						$result['assignments'][]	= $this->website_model->save_assignment($assign);
					}
				}
			}
		}
	}

	return $result;
 }

 function get_assignments($vars=null){

	$sql = "SELECT a.*, n.*, p.*, r.*,
	comm.community_name,
	comm.iteration AS community_iteration,
	church.church_name,
	church.campus_name,
	church.id_church_parent,
	a.state AS `assign_state`,
	a.date_add AS `assign_date_add`,
	a.date_mod AS `assign_date_mod`,
	a.date_removed AS `assign_date_removed`,
	a.id_add AS `assign_id_add`,
	a.id_mod AS `assign_id_mod`
	FROM `ltp_assignments` AS a
	LEFT JOIN `ltp_needs` AS n ON a.id_need = n.id_need
	LEFT JOIN `ltp_people` AS p ON a.id_people = p.id_people
	LEFT JOIN `ltp_roles` AS r ON r.id_role = a.id_role
	LEFT JOIN `ltp_churches` AS church ON church.id_church = a.id_church
	LEFT JOIN `ltp_communities` AS comm ON comm.id_community = a.id_community
	WHERE n.`id_need` > '0'";

	if(!empty($vars['people_ids'])){
		$sql .= " AND a.id_need IN (".$vars['people_ids'].")";
	}
	if(!empty($vars['community_ids'])){
		$sql .= " AND a.id_community IN (".$vars['community_ids'].")";
	}
	if(!empty($vars['id_assignment'])){
		$sql .= " AND a.id_assignment =  ".$this->db->escape($vars['id_assignment']);
	}
	if(!empty($vars['id_need'])){
		$sql .= " AND n.id_need =  ".$this->db->escape($vars['id_need']);
	}elseif(!empty($vars['need_ids'])){
		if(is_array($vars['need_ids'])){
			$vars['need_ids'] = implode(',',$vars['need_ids']);
		}
		$sql .= " AND a.id_need IN (".$vars['need_ids'].")";
	}
	if(!empty($vars['id_community'])){
		$sql .= " AND a.id_community =  ".$this->db->escape($vars['id_community']);
	}
	if(!empty($vars['id_church'])){
		$sql .= " AND a.id_church =  ".$this->db->escape($vars['id_church']);
	}
	if(!empty($vars['id_role'])){
		$sql .= " AND a.id_role =  ".$this->db->escape($vars['id_role']);
	}
	if(!empty($vars['assignment_type'])){
		$sql .= " AND a.assignment_type =  ".$this->db->escape($vars['assignment_type']);
	}
	if(!empty($vars['role_scope'])){
		$sql .= " AND r.role_scope =  ".$this->db->escape($vars['role_scope']);
	}
	/*
	if(!empty($vars['no_msgs']) || !empty($vars['omit_messages'])){
		$sql .= " AND (a.id_msg IS NULL OR a.id_msg < '1' )";
	}
	*/
	if(!empty($vars['show_deleted'])){

	}elseif(isset($vars['state'])){
		$sql .= " AND n.state = ".$this->db->escape($vars['state'])."  AND a.state = ".$this->db->escape($vars['state']);
	}else{
		$sql .= " AND n.state > 0  AND a.state >0 ";
	}

	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY p.name_first";
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

	if(!empty($vars['debug'])){
		echo '<br /><br />'.$sql;
		if($vars['debug'] == 'stop'){
			exit();
		}
	}


	$query = $this->db->query($sql,false);


   if($query -> num_rows() > 0){

		$r = $query->result_array();


		foreach($r as $key => $val){
			if( !empty($val['people_email_primary'])){
				$r[$key]['people_email']	= $val['people_email_primary'];
			}elseif(!empty($val['people_email_secondary'])){
				$r[$key]['people_email']	= $val['people_email_secondary'];
			}
			$r[$key]['id_need_encoded']		= url_enc($r[$key]['id_need']);
		}

		return $r;

   }elseif(!empty($vars['return_schema'])){
		 return $empty;
	}else{

		return null;
	}

 }


	function get_assignment($vars=null){

		$result = $this->get_assignments($vars);


		if(!empty($result)){
		   $r = $result[0];
		 return $r;

		}else{
		 return false;
		}
	}




	function get_need_status_from_state($list){
		$status 	= '';

		if(isset($list['need_state'])){
			$list['state']				= $list['need_state'];
		}

		switch($list['state']){
			 case '-2':
				$status				= 'Deleted';
			 break;
			 case '1':
				$status				= 'Not Set';
			 break;
			 case '5':
				$status				= 'Unknown';
			 break;
			 case '10':
				$status				= 'Potential Need';
			 break;
			 case '15':
				$status				= 'Need Confirmed';
			 break;
			 case '40':
				$status				= 'Need Assigned';
			 break;
			 case '45':
				$status				= 'Need Being Fulfilled';
			 break;
			 case '50':
				$status				= 'Need Met';
			 break;
		 }

		 return $status;
	}

	function display_need_avatar($vars){
		$html = '';
		$html .= '<div class="avatar-circle center-block">';
		$icon = $this->get_need_type_icon($vars);
			if(!empty($icon)){
				$html .= '<span class="initials"><i class="fa '.$icon.'"></i></span>';
			}else{
				$html .= '<span class="initials"><i class="fa fa-question-circle"></i></span>';
			}

			$html .= '</div>';

		if(!empty($vars['avatar_code_only'])){
			return $html;
		}else{
			echo $html;
		}

	}


	function get_display_need_type($vars){
		$r 					= array('need_type_name' => '');
		$id_parent			= null;
		$needs_associated 	= $this->get_need_types_associated($vars);


		if(!empty($needs_associated)){
			if(!empty($vars['id_need_type'])){
				$id_need_type	= $vars['id_need_type'];
				if(!empty($needs_associated[$id_need_type])){
    				$r 				= $needs_associated[$id_need_type];
    				if(!empty($needs_associated[$id_need_type]['id_need_type_parent'])){
    					$id_parent	= $needs_associated[$id_need_type]['id_need_type_parent'];
    				}
				}
			}elseif(!empty($vars['need_type_slug'])){
				foreach($needs_associated as $cur){
					if(strtolower($vars['need_type_slug']) == strtolower($cur['need_type_slug'])){
						$r = $cur;
						if(!empty($cur['id_need_type_parent'])){
							$id_parent	= $cur['id_need_type_parent'];
						}
					}
				}
			}

			//Check for parent name
			if(!empty($id_parent)){
				$id_need_type				= $id_parent;
				$sub						= $r['need_type_name'];
				$r['need_type_name']		= $needs_associated[$id_need_type]['need_type_name'].': '.$sub;
			}
		}

		return $r['need_type_name'];
	}




	function get_display_need_priority(){
		if(!empty($vars['need_priority'])){
			switch($vars['need_priority']){
				case 10:
					return 'Urgent';
				break;
				case 5:
					return 'Normal';
				break;
				case 1:
					return 'Low';
				break;
			}

		}
		return 'Normal';
	}


	function get_display_need_name($vars){
		return $vars['need_name'];
	}

	function get_need_fulfillers($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(!empty($vars['id_need'])){
			$vars['role']	= '105,106';
			return $this->get_need_participants($vars);
		}
		return array();
	}

	function get_need_admins($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(!empty($vars['id_need'])){
			$vars['role']	= '104';
			return $this->get_need_participants($vars);
		}
		return array();
	}

	function get_need_organizers($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(!empty($vars['id_need'])){
			$vars['role']	= '104';
			return $this->get_need_participants($vars);
		}
		return array();
	}

	function get_need_recipients($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(!empty($vars['id_need'])){
			$vars['role']	= '105,106';
			return $this->get_need_participants($vars);
		}
		return array();
	}

	function get_need_participants($vars){
		$vars			= format_array_vals($vars, 'id_need');
		$vars['role']	= !empty($vars['role']) ? $vars['role'] : '105,106';

		$sql = "SELECT 	a.*,
						a.state as `assign_state`,
						a.id_affiliate as `assign_id_affiliate`,
						p.name_first,
						p.name_last,
						p.people_email_primary,
						p.people_phone_mobile,
						p.state AS `people_state`,
						p.url_avatar,
						p.url_avatar_one_pager
				FROM `ltp_assignments` AS a
				LEFT JOIN `ltp_people` AS p ON p.id_people = a.id_people
				WHERE a.assignment_type = 'people_to_need' AND a.id_role IN (".$vars['role'].")";

		if(isset($vars['state'])){
			$sql .= " AND a.state = ".$this->db->escape($vars['state']);
		}else{
			$sql .= " AND a.state > 0";
		}
		if(!empty($vars['id_need'])){
			$sql .= " AND a.id_need =  ".$this->db->escape($vars['id_need']);
		}else{
			if(!empty($vars['id_people'])){
				$sql .= " AND a.id_people =  ".$this->db->escape($vars['id_people']);
			}
		}

		if(!empty($vars['last_update'])){
			$sql .= " AND a.date_mod >=  ".$this->db->escape($vars['last_update']);
		}

		$sql .= " GROUP BY a.id_people";

		if(isset($vars['order'])){
			$sql .= " ORDER BY ".$this->db->escape($vars['order']);
		}else{
			$sql .= " ORDER BY a.id_role ASC, p.name_last ASC, p.name_first";
		}
		if(isset($vars['order_dir'])){
			$sql .= " ".$vars['order_dir'];
		}else{
			$sql .= " ASC";
		}
		if(isset($vars['limit'])){
			$sql .= " LIMIT ".$vars['limit'];
		}else{
			$sql .= " LIMIT 0,2000";
		}


		$query = $this->db->query($sql,false);

		if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
			echo '<p><strong>needs_model->get_need_fulfillers: </strong>'.$sql.'</p>';
			exit();
		}elseif(!empty($vars['debug'])){
			echo '<p><strong>eeds_model->get_need_fulfillers: </strong>'.$sql.'</p>';
		}

		if(is_object($query)){
			if($query->num_rows() > 0){
				$r = $query->result_array();
				return $r;
			}
		}

		 return array();
	}


	function is_need_participant($vars){
		if(!empty($vars['id_people']) && !empty($vars['id_need'])){
			$vars['role']	= !empty($vars['role']) ? $vars['role'] : null;
			switch(strtolower($vars['role'])){
				case 'admin':
				case 'admins':
				case 'organizers':
				case 'organizer':
					$peeps 			= $this->get_need_organizers($vars);
				break;
				case 'fulfillers':
				case 'fulfiller':
				case 'vols':
				case 'volunteers':
					$vars['state'] 	= 40;
					$peeps 			= $this->get_need_fulfillers($vars);
				break;
				case 'decliner':
					$vars['state'] 	= 24;
					$peeps 			= $this->get_need_fulfillers($vars);
				break;
				case 'recipients':
				case 'recipient':
					$peeps 			= $this->get_need_recipients($vars);
				break;
				default:
					$peeps = $this->get_need_participants($vars);
				break;
			}

			if(!empty($peeps)){
				foreach($peeps as $cur){
					if($cur['id_people'] == $vars['id_people']){
						return true;
					}
				}
			}

		}
		return false;
	}

	function is_need_organizer($vars){
		$vars				= format_array_vals($vars, 'id_need');
		$vars['role'] 		= 'organizer';
		return $this->is_need_participant($vars);
	}

	function is_need_fulfiller($vars){
		$vars				= format_array_vals($vars, 'id_need');
		$vars['role'] 		= 'fulfiller';
		return $this->is_need_participant($vars);
	}

	function is_need_decliner($vars){
		$vars				= format_array_vals($vars, 'id_need');
		$vars['role'] 		= 'decliner';
		return $this->is_need_participant($vars);
	}

	function is_need_recipient($vars){
		$vars			= format_array_vals($vars, 'id_need');
		$vars['role'] 		= 'recipient';
		return $this->is_need_participant($vars);
	}


	function get_display_need_list_fulfillers($vars){
		$vars			= format_array_vals($vars, 'id_need');

		if(empty($vars['need_fulfillers'])){
			$vars['need_participants'] = $this->get_need_fulfillers(array('id_need' => $vars['id_need'], 'debug' => 0));
		}
		return $this->get_display_need_list_people($vars);

	}

	function get_display_need_list_recipients($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(empty($vars['need_recipients'])){
			$vars['need_participants'] = $this->get_need_recipients(array('id_need' => $vars['id_need'], 'debug' => 0));
		}
		return $this->get_display_need_list_people($vars);

	}

	function get_display_need_list_admins($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(empty($vars['need_admins'])){
			$vars['need_participants'] = $this->get_need_admins(array('id_need' => $vars['id_need'], 'debug' => 0));
		}
		return $this->get_display_need_list_people($vars);

	}

	function get_need_volunteer_count($vars){
		$vars			= format_array_vals($vars, 'id_need');
		if(!empty($vars['id_need'])){
			$vars['role']	= '105,106';
			$vols			= $this->get_need_participants($vars);
			if(!empty($vols)){
				return count($vols);
			}
		}
		return 0;
	}

	function get_need_volunteer_max($vars){
		$vars				= format_array_vals($vars, 'id_need');

		if(!empty($vars['id_need'])){
			$vars['vols_max']	= !empty($vars['vols_max']) ? $vars['vols_max'] : 0;

			if(!empty($vars['id_need'])){
				if(empty($vars['vol_max'])){
					$vars 		= $this->get_need(array('id_need' => $vars['id_need']));
				}
			}
		}

		return (int) !empty($vars['vols_max']) ? $vars['vols_max'] : 0;
	}

	function need_is_claimable($vars){
	    $vars				= format_array_vals($vars, 'id_need');
	    if(!empty($vars['id_need'])){
	        $vars['vol_max']            = $this->get_need_volunteer_max($vars);
	        $vars['vol_count']			= $this->get_need_volunteer_count($vars);
	        if(empty($vars['vol_max'])){
	            return true;
	        }elseif($vars['vol_count'] < $vars['vol_max']){
	            return true;
	        }
	    }

	    return false;
	}

	function get_display_need_list_people($vars){
		$r 				= '';
		$small_open		= '';
		$small_close	= '';

		if(empty($vars['view'])){
			$vars['view'] = 'default';
		}

		if(!empty($vars['display_small_avatars'])){
			$small_open 			= '<span style="font-size: 70%;">';
			$small_close 			= '</span>';
			$small_avatar			= 1;
		}

		if(!empty($vars['need_participants'])){
			switch($vars['view']){
				case 'needs_edit_view':
					foreach($vars['need_participants'] as $cur){
						$cur['avatar_code_only']	= 1;
						$msg_json					= array('subject' => 'Request for assitance');
						$msg_json					= json_encode($msg_json);

						$r .='<div class="row" style="padding:10px; border-bottom: solid 1px #ddd">';
						$r .='<div class="text-center col-md-2 col-md-offset-1 col-sm-12">'.$small_open.$this->people_model->display_people_avatar($cur).'</div>';
						$r .='<div class="col-md-5 col-sm-12"> '.$cur['name_first'].' '.$this->website_model->display_format_people_name_last($cur).'</div>';
						switch($cur['state']){
							 case '30':
								$r .='<div class="col-md-4 col-sm-12"><i class="fa fa-question-circle tooltip-wide" data-toggle="tooltip" data-html="true" data-placement="top" title="" data-original-title="You sent this reuqest at 5:30pm on 9/3/2019"></i> (Request Sent)'.'</div>';
							 break;
							 case '40':
								$r .='<div class="col-md-4 col-sm-12"><i class="fa fa-check tooltip-wide" data-toggle="tooltip" data-html="true" data-placement="top" title="" data-original-title="This volunteer accepted this need request at 7:30am on 9/1/2019"></i> (Confirmed)'.'</div>';
							 break;
							 case '45':
								$r .='<div class="col-md-4 col-sm-12"><i class="fa fa-check tooltip-wide" data-toggle="tooltip" data-html="true" data-placement="top" title="" data-original-title="This volunteer started to fulfill this reuqest at 4:30am on 9/4/2019"></i> (Fulfilling)'.'</div>';
							 break;
							 case '50':
								$r .='<div class="col-md-4 col-sm-12"><i class="fa fa-check"></i> (Completed)'.'</div>';
							 break;
							 default:
								$r .='<div class="col-md-4 col-sm-12"><a href="#bannerformmodal" data-toggle="modal" data-target="#composemessagemodal" class="btn-msg-trigger" data-rids="'.$cur['id_people'].'" data-msgjson=\''.$msg_json.'\'><i class="fa fa-envelope tooltip-wide" data-toggle="tooltip" data-html="true" data-placement="top" title="" data-original-title="This volunteer has not been notified of this need request."></i> Send Request</a>'.'</div>';
							break;
						}
						$r .='</div>';
					}
				break;
				default:
					foreach($vars['need_participants'] as $cur){
						$cur['avatar_code_only']	= 1;
						if(!empty($small_avatar)){
							$cur['avatar_small']		= 1;
						}
						if(!empty($vars['style_borders'])){
							$r .='<div class="row" style="padding:10px; border-bottom: solid 1px #ddd">';
						}else{
							$r .='<div class="row">';
						}
						$r .='<div class="text-center col-md-2 col-md-offset-1 col-sm-12">'.$small_open.$this->people_model->display_people_avatar($cur).$small_close.'</div>';
						$r .='<div class="col-md-5 col-sm-12"> '.$small_open.$cur['name_first'].' '.$this->website_model->display_format_people_name_last($cur).$small_close.'</div>';
						$r .='<div class="col-md-4 col-sm-12">'.$small_open.'<i class="fa fa-check"></i> (Confirmed)'.$small_close.'</div>';
						$r .='</div>';
					}
				break;
			}
		}

		if(empty($r)){
			$r 	= 'None Assigned';
		}

		return $r;
	}

	function get_need_type_name_by_need_type_id($vars){
		$vars 		= format_array_vals($vars, 'id_need_type');

		if(!empty($vars['id_need_type'])){
			$need_type = $this->get_need_type(array('id_need_type' => $vars['id_need_type']));
			if(!empty($need_type['need_type_name'])){
				return $need_type['need_type_name'];
			}
		}

		return null;

	}

	function get_need_recurrence_name($vars){
		$vars 		= format_array_vals($vars, 'id_need_type');
		$r 			= null;
		if(!empty($vars['need_recurrence'])){
			switch($vars['need_recurrence']){
				case 200:
					$r = 'daily';
				break;
				case 300:
					$r = 'weekly';
				break;
				case 400:
					$r = 'bi-weekly';
				break;
				case 500:
					$r = 'monthly';
				break;
				case 600:
					$r = 'Bi-Monthly';
				break;
				case 700:
					$r = 'Quarterly';
				break;
				case 800:
					$r = 'Semi-Annually';
				break;
				case 900:
					$r = 'Annually';
				break;

			}
		}

		return $r;
	}

	function format_need_details($vars){
	$vars	= format_array_vals($vars, 'id_need');
	if(empty($vars['need_name'])){
		$need	= $this->get_need($vars);
		if(!empty($need)){
			$vars	= array_merge($vars, $need);
		}
	}

	$vars['event']						= $this->get_event_from_need_id($vars['id_need']);


	$r['html'] 							= '';
	$vars['email_id_affiliate']			= !empty($vars['email_id_affiliate']) ? $vars['email_id_affiliate'] : $this->affiliates_model->get_active_affiliate_id();
	$use_div 							= !empty($vars['use_div']) ? true : false;

	$base_url	 						= $this->affiliates_model->correct_url_for_affiliate(array('url' => base_url(), 'id_affiliate' => $vars['email_id_affiliate']));
	$img_url							= 'https://promiseserves.org/';
	$vars['volunteer_confirmed_count']	= 0;
	$vars['need_vol_count_text']		= 'If you would like to help meet this need click the <i>Claim</i> button below.';
	$vars['output']						= !empty($vars['output']) ? $vars['output'] : null;
	$vars['size']						= !empty($vars['size']) ? strtolower($vars['size']) : 'large';

	switch($vars['size']){
		case 'large':
			$vars['font_size']	= '2x';
			$vars['img_size']	= '32';
			$vars['htag_open']	= '<h3>';
			$vars['htag_close']	= '</h3>';
			$vars['top']		= 'top40';
		break;
		case 'small':
			$vars['font_size']	= '2x';
			$vars['img_size']	= '24';
			$vars['htag_open']	= '<h4>';
			$vars['htag_close']	= '</h4>';
			$vars['top']		= 'top20';
		break;
	}


	if($vars['output']	== 'div' || $vars['output']	== 'web' ){
		$use_div 		= true;
		$r['html']		.= '<div class="ps-need-details-wrapper">'.PHP_EOL;
		$r['html']		.= '<div class="">'.$vars['htag_open'].$vars['need_name'].$vars['htag_close'].'</div>'.PHP_EOL;
	}else{
		$r['html']		.= '<table width="90%" cellspacing="2" cellpadding="5" style="margin-left: auto; margin-right: auto;" border="0">'.PHP_EOL;
		$r['html']		.= '<tbody>'.PHP_EOL;
		$r['html']		.= '<tr><td><img src="'.$img_url.'img/icon_info.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td><h3>'.$vars['need_name'].'</h3></td></tr>'.PHP_EOL;
	}

	if(!empty($vars['event']['event_date_start'])){

		$vars['event']['event_date_time']	= $this->events_model->format_event_date_time($vars['event']);

		if($use_div){
			$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10"><i class="fa fa-calendar fa-'.$vars['font_size'].'"></i></div><div class="col-sm-11 col-xs-11">'.$vars['event']['event_date_time'].'</div></div>'.PHP_EOL;
		}else{
			$r['html']	.= '<tr><td><img src="'.$img_url.'img/icon_calendar.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td>'.$vars['event']['event_date_time'].'</h3></td></tr>'.PHP_EOL;
		}
	}

	//Format Location & add to HTML output
	if(empty($vars['bypass_location'])){
		if(!empty($vars['event']['event_location_name'])){

			$vars['event']['event_loc']	= '<span class="cal-location-name">'.$vars['event']['event_location_name'].'</span>'.PHP_EOL;
			if(!empty($vars['event']['event_address_street']) || !empty($vars['event']['event_address_city']) || !empty($vars['event']['community_address_city'])){
				$vars['event']['event_loc']	.= '<br />';
			}
		}

		if(!empty($vars['event']['event_address_street']) || !empty($vars['event']['event_address_city']) || !empty($vars['event']['community_address_city'])){
			$vars['event']['addresses']		= 'event';
			$compiled_address				= $this->website_model->get_compiled_address($vars['event']);

			//Try again to match on the community address if available
			if(empty($compiled_address)){
				$vars['event']['addresses']		= 'community';
				$compiled_address				= $this->website_model->get_compiled_address($vars['event']);
			}

			if(!empty($compiled_address)){
				$url 							= 'https://www.google.com/maps/search/?api=1&query='.urlencode(trim($this->website_model->get_compiled_address($vars['event'])));
				$vars['event']['event_loc']		= '<span class="cal-location-address"><a href="'.$url.'" target="_blank">'.$this->website_model->get_compiled_address($vars['event']).'</a></span>'.PHP_EOL;
			}
		}

		if(!empty($vars['event']['event_loc'])){

			if($use_div){
				$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10"><i class="fa fa-map-marker fa-'.$vars['font_size'].'"></i></div><div class="col-sm-11 col-xs-11">'.$vars['event']['event_loc'].'</div></div>'.PHP_EOL;
			}else{
				$r['html']	.= '<tr><td><img src="'.$img_url.'img/icon_loc.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td>'.$vars['event']['event_loc'].'</td></tr>'.PHP_EOL;
			}
		}elseif(!empty($vars['id_place'])){

			if($use_div){
				$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10"><i class="fa fa-map-marker fa-'.$vars['font_size'].'"></i></div><div class="col-sm-11 col-xs-11">'.$vars['id_place'].'</div></div>'.PHP_EOL;
			}else{
				$r['html']	.= '<tr><td><img src="'.$img_url.'img/icon_loc.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td>'.$vars['id_place'].'</td></tr>'.PHP_EOL;
			}
		}
	}

	//Format Event Contact
	if(!empty($vars['event']['id_event_contact'])){
		$contact 	= $this->people_model->get_person(array('id_people' => $vars['event']['id_event_contact']));
		if(!empty($contact['name_first'])){
			$contact['avatar_code_only']	= 1;
			$contact['avatar_small']		= 1;
			$avatar							= $this->people_model->display_people_avatar($contact);
			$event_contact					= '<span class="cal-contact-name">Contact - '.$contact['name_first'].' '.$this->website_model->display_format_people_name_last($contact['name_last']).'</span>'.PHP_EOL;
			if(!empty($contact['people_email_primary']) || !empty($contact['people_phone_mobile'])){
				$event_contact				.= '<br />';
			}
			if(!empty($contact['people_email_primary'])){
				$event_contact				.= '<small><a href="mailto:'.$this->website_model->display_format_email($contact['people_email_primary']).'">'.$this->website_model->display_format_email($contact['people_email_primary']).'</small></a>'.PHP_EOL;
				if(!empty($contact['people_phone_mobile'])){
					$event_contact				.= '<br />'.PHP_EOL;
				}
			}
			if(!empty($contact['people_phone_mobile'])){
				$event_contact				.= '<small><a href="tel:'.format_phone($contact['people_phone_mobile']).'">'.format_phone($contact['people_phone_mobile']).'</small></a>'.PHP_EOL;
			}
			if($use_div){
				$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10">'.$avatar.'</div><div class="col-sm-11 col-xs-11">'.$event_contact.'</div></div>'.PHP_EOL;
			}else{
				$r['html']	.= '<tr><td>'.$avatar.'</td><td>'.$event_contact.'</td></tr>'.PHP_EOL;
			}
		}
	}


	if(!empty($vars['need_desc'])){
		if($use_div){
			$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10"><i class="fa fa-sticky-note fa-'.$vars['font_size'].'"></i></div><div class="col-sm-11 col-xs-11">'.$this->website_model->format_copy($vars['need_desc']).'</div></div>'.PHP_EOL;
		}else{
			$r['html']	.= '<tr><td><img src="'.$img_url.'img/icon_note.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td>'.$this->website_model->format_copy($vars['need_desc']).'</h3></td></tr>'.PHP_EOL;
		}
	}

	if(!empty($vars['vols_estimated']) && empty($vars['bypass_vols_estimated'])){

		$vars['volunteers']					= $this->get_need_confirmed_volunteers($vars['id_need']);

		if(!empty($vars['volunteers'])){
			$vars['volunteer_confirmed_count']	= count($vars['volunteers']);
			if($vars['volunteer_confirmed_count'] > 0){
				$vars['need_vol_count_text']		= 'This need requires '.($vars['vols_estimated'] - $vars['volunteer_confirmed_count']).' more volunteers. If you would like to help meet this need click the <i>Claim</i> button below.';
			}
		}

		if($use_div){
			$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10"><i class="fa fa-hands-helping fa-'.$vars['font_size'].'"></i></div><div class="col-sm-11 col-xs-11">'.$vars['need_vol_count_text'].'</div></div>'.PHP_EOL;
		}else{
			$r['html']	.= '<tr><td><img src="'.$img_url.'img/icon_handshake.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td>'.$vars['need_vol_count_text'].'</h3></td></tr>'.PHP_EOL;
		}
	}elseif(empty($vars['bypass_vols_estimated'])){
		if($use_div){
			$r['html']	.= '<div class="row '.$vars['top'].'"><div class="text-center col-sm-1 col-xs-1 gutter-10"><i class="fa fa-hands-helping fa-'.$vars['font_size'].'"></i></div><div class="col-sm-11 col-xs-11">'.$vars['need_vol_count_text'].'</div></div>'.PHP_EOL;
		}else{
			$r['html']	.= '<tr><td><img src="'.$img_url.'img/icon_handshake.png" style="margin-left: auto; margin-right: auto;" width="'.$vars['img_size'].'"></td><td>'.$vars['need_vol_count_text'].'</h3></td></tr>'.PHP_EOL;
		}
	}



	if(!empty($vars['event'])){
		if(!empty($vars['event']['params']['bypass_calendar_links'])){
			if($use_div){

			}else{
				$r['html']	.= '</tbody>'.PHP_EOL;
				$r['html']	.= '</table>'.PHP_EOL;
			}

		}else{

			if($use_div){
				$link_gcal	= '<div class="col-sm-4">'.$this->calendar_model->make_gcal_link($vars['event']).'</div>';
				$link_ics	= '<div class="col-sm-4"><a href="'.$base_url.'calendar/ics/?e='.url_enc($vars['event']['id_event']).'" class="btn btn-default btn-block"><i class="fa fa-calendar"></i> Add to Outlook</a></div>'.PHP_EOL;
				$link_ical	= '<div class="col-sm-4"><a href="'.$base_url.'calendar/ical/?e='.url_enc($vars['event']['id_event']).'" class="btn btn-default btn-block"><i class="fa fa-apple"></i> Add to iCal</a></div>'.PHP_EOL;
				$r['html']	.= '<div class="row top40"><div class="text-center col-sm-12 col-xs-12">'.$link_gcal.$link_ics.$link_ical.'</div></div>'.PHP_EOL;
			}else{
				//Add personal calendar sync option
				$vars['event']['use_cal_icon']	= 1;
				$r['html']	.= '<td style="text-align:center" colspan="3"><br /><br /><strong>Add to your calendar</strong></td></tr>'.PHP_EOL;
				$link_gcal	= $this->calendar_model->make_gcal_link($vars['event']);
				$link_ics	= '<a href="'.$base_url.'calendar/ics/?e='.url_enc($vars['event']['id_event']).'" class="btn btn-default"><img src="'.$base_url.'img/icon_ocal.jpg" width="32"><br />[Outlook]</a>'.PHP_EOL;
				$link_ical	= '<a href="'.$base_url.'calendar/ical/?e='.url_enc($vars['event']['id_event']).'" class="btn btn-default"><img src="'.$base_url.'img/icon_ical.jpg" width="32"><br />[iCal]</a>'.PHP_EOL;

				$r['html']	.= '<tr><td style="text-align:center">'.$link_gcal.'</td><td style="text-align:center">'.$link_ics.'</td><td style="text-align:center">'.$link_ical.'</td>'.PHP_EOL;

				$r['html']	.= '</tbody>'.PHP_EOL;
				$r['html']	.= '</table>'.PHP_EOL;
			}
		}
	}

	return $r['html'];

	unset($event_contact);
	unset($vars);
	unset($avatar);
	unset($contact);
	unset($url);
}

function get_event_from_need_id($vars){
	$vars = format_array_vals($vars, 'id_need');


	if(!empty($vars['id_need'])){

		$assign = $this->website_model->get_assignment_record(array('id_need' => $vars['id_need'], 'assignment_type' => 'event_to_need', 'debug' => 0));

		if(!empty($assign['id_event'])){
			$event = $this->events_model->get_event(array('id_event' => $assign['id_event'], 'bypass_affiliate' => 1));
			if(!empty($event)){
				return $event;
			}
		}
	}


	return array();

}

function get_need_confirmed_volunteers($vars){
	$vars 			= format_array_vals($vars, 'id_need');
	$vars['state']	= 40;
	return $this->get_need_volunteers($vars);
}

function get_need_volunteers($vars){
	$vars 			= format_array_vals($vars, 'id_need');
	$people_ids 	= array();
	$peeps			= array();

	if(!empty($vars['id_need'])){

		$assigns = $this->website_model->get_assignments(array('id_need' => $vars['id_need'], 'assignment_type' => 'people_to_need', 'id_roles' => '105,106', 'debug' => 0));

		if(!empty($assigns)){
			foreach($assigns as $cur){
				if(!empty($vars['state'])){
					if($cur['state'] == $vars['state']){
						$people_ids[] = $cur['id_people'];
					}
				}else{
					$people_ids[] = $cur['id_people'];
				}
			}
		}

		if(!empty($peeople_ids)){
			$peeps = $this->people_model->get_people(array('people_ids' => $people_ids));

		}

	}

	return $peeps;
}

function make_event_name_from_need($vars){
	$vars 			= format_array_vals($vars, 'id_need');
	$r 				= 'Need';
	if(!empty($vars['id_need'])){
		if(empty($vars['need_name'])){
			$need = $this->get_need(array('id_need' => $vars['id_need']));
			$vars = array_merge($vars, $need);
		}
	}

	if(!empty($vars['assign_id_community']) && empty($vars['id_community'])){
		$vars['assign_id_community'] = $vars['id_community'];
	}

	$need_type = $this->get_need_type(array('id_need_type' => $vars['id_need_type']));

	if(!empty($need_type['need_type_name'])){
		$r = $need_type['need_type_name'];
	}

	if(!empty($vars['community_name'])){
		$r .= ' - '.$vars['community_name'];
	}

	if(empty($vars['community_name']) && !empty($vars['id_community'])){
		$comm = $this->communities_model->get_community(array('id_community' => $vars['id_community']));
		if(!empty($comm['community_name'])){
			$r .= ' - '.$comm['community_name'];
		}
	}

	return $r;

}


function notify_need_organizer_of_response($vars){
	if(!empty($vars['id_assignment'])){
		$assign 		= $this->website_model->get_assignment(array('id_assignment' => $vars['id_assignment']));

		if(!empty($assign['id_need'])){
			$arr_send_log						= array();
			$need 								= $this->get_need(array('id_need' => $assign['id_need']));
			$need['bypass_vols_estimated']		= 1;
			$organizers 						= $this->get_need_organizers(array('id_need' => $assign['id_need']));

			$vol								= $this->people_model->get_person(array('id_people' => $assign['id_people']));
			$base_url							= $this->affiliates_model->correct_url_for_affiliate(array('url' => base_url(), 'id_affiliate' => $need['assign_id_affiliate']));
			$msg_alias							= 'email_need_organizer_volunteer_response_notify_'.$vars['notify_type'];

			if(!empty($organizers)){
				$msg_template				= $this->messages_model->get_messaging_template(array('debug' => 0, 'messaging_alias' => $msg_alias));

				foreach($organizers as $organizer){
					$can_send				= false;
					$has_sender 			= false;
					$has_body 				= false;
					$has_subject 			= false;
					$has_recipient			= false;
					$hasnt_sent				= true;
					$email					= array();

					//Check to make sure this response wasn't already sent to the organizer
					if(!empty($assign['assign_params']['need']['need_organizer_notification'])){
						foreach($assign['assign_params']['need']['need_organizer_notification'] as $cur_notify){
							if(!empty($cur_notify['id_need_organizer'])){
								if($cur_notify['id_need_organizer'] == $organizer['id_people'] && $msg_alias == $cur_notify['msg_alias']){
									$hasnt_sent = false;
								}
							}
						}
					}

					if(!empty($msg_template)){
						$merge_vars										= $email;
						$merge_vars['messaging_params']					= $msg_template['messaging_params'];
						$merge_vars['id_email_layout']					= $msg_template['id_email_layout'];
						$merge_vars['msg_body']							= $msg_template['messaging_body'];
						$merge_vars['messaging_subject']				= $msg_template['messaging_subject'];
						$merge_vars['email_layout_header']				= $msg_template['email_layout_header'];
						$merge_vars['merge_RECIPIENT_NAME_FIRST'] 		= format_name($organizer['name_first']);
						$merge_vars['merge_VOL_NAME_FIRST'] 			= format_name($vol['name_first']);
						$merge_vars['merge_VOL_NAME_LAST'] 				= format_name($vol['name_last']);
						$merge_vars['merge_VOL_NAME_FULL'] 				= format_name($vol['name_first']).' '.format_name($vol['name_last']);
						$merge_vars['merge_NEED_DETAILS']				= $this->needs_model->format_need_details($need);
						$merge_vars['merge_LINK_NEED_DETAILS']			= '<p class="text-center" style="text-align: center;"><a href="'.$base_url.'need/details/'.url_enc($need['id_need']).'" target="_blank">Click here to view the need details</a></p>';
						if(!empty($need['community_name'])){
							$merge_vars['merge_NAME_FAMILY']			= $this->communities_model->get_care_community_family_last_name($need['community_name']);
						}

						if(!empty($need['assign_id_affiliate'])){
							$merge_vars['email_id_affiliate']			= $need['assign_id_affiliate'];
						}
						$email['message']								= $this->emails_model->merge_email_layout($merge_vars);

						$merge_vars['messaging_body']					= $email['message'];
						$merge_vars['merge_vars']['id_recipient']		= $organizer['id_people'];
						$merged				 							= $this->messages_model->merge_messaging_fields($merge_vars);

						$email['message']								= $merged['messaging_body'];
						$email['subject']								= $merged['messaging_subject'];
					}

					if(!empty($organizer['people_email_primary'])){
						$email['to_email']			= $organizer['people_email_primary'];
						$email['to_name']			= format_name($organizer['name_first']).' '.format_name($organizer['name_last']);

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
						}else{
							$r['msg']	= 'transport error sending messaging';
							$r['html']	= 'Whoops, there was an error sending you message. Please try again.';
							$r['code']	= 'error_transport';
							$r['class'] = 'alert-warning';
						}
						$arr_send_log[] = array('id_need_organizer' => $organizer['id_people'], 'date_sent' =>time(), 'msg_alias' => $msg_alias);
					}
				}
			}
		}

		if(!empty($arr_send_log)){

			$data['result_assign_params']		= $this->website_model->update_assignment_params(array('id_assignment' => $vars['id_assignment'],
																										'assign_params' => array('need' => array('need_organizer_notification' => $arr_send_log))));
		}

	}

	return false;
}


function delete_family_needs($vars){
	$vars 	= format_array_vals($vars, 'id_family');

	if(!empty($vars['id_family'])){
		$assigns	= $this->website_model->get_assignmnets(array('id_family' => $vars['id_family'], 'assignment_type' => 'need_to_family'));
		if(!empty($assigns)){
			foreach($assigns as $cur){
				$r['result'][]	= $this->website_model->delete_assignment(array('id_assignment' => $cur['id_assignment']));
				$_SESSION['logged_in']['deleted']['assigns']['need_to_family'][]	= $cur['id_family'];
			}
		}
	}

	return $r;


}

function get_need_name($vars){
	$vars = format_array_vals($vars, 'id_need');
	if(!empty($vars['need_name'])){
		return $vars['need_name'];
	}
	return null;
}

function is_need_claimed($vars){
    $vars = format_array_vals($vars, 'id_need');
    if(!empty($vars['id_need'])){
        $assigns	 = $this->website_model->get_assignments(array('assignment_type' => 'people_to_need', 'id_need' => $vars['id_need'], 'id_role' => $vars['id_role'], 'id_people' => $vars['id_people'], 'debug' => 0));
    }
}

function get_need_from_event_id($vars){
    $vars = format_array_vals($vars, 'id_event');

    if(!empty($vars['id_event'])){
        $assign = $this->get_assignment(array('id_event' => $vars['id_event'], 'assignment_type' => 'event_to_need'));
        if(!empty($assign['id_need'])){
            return $this->get_need(array('id_need' => $assign['id_need']));
        }
    }

    return array();
}


}//End Class
?>
```
