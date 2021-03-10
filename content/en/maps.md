```php
 function get_maps($vars=null){
function get_map($vars=null){
function save_map_set($data=NULL){
function get_cumulative_map_data($vars){
function get_edit_map_data($vars=null){
function get_map_vals($vars=null){

	$query = $this->db->query($sql,false);

	if(!empty($vars['debug'])){
		echo '<strong>Maps_model->get_map_vals</strong><br /><p>'.$sql.'</p>';
	}
	if(!empty($vars['debug_stop'])){
		echo '<strong>Maps_model->get_map_vals</strong><br />'.$sql;
		exit();
	}

	if($query -> num_rows() > 0){

		return $query->result_array();

	}elseif(!empty($vars['return_schema'])){
		$r[0]	= $this->website_model->get_table_schema('ltp_maps');
		return $r;
	}else{
		return array();
	}
}

function get_map_val_id($vars){
	if(!empty($vars['id_map']) && !empty($vars['id_map_set_val'])){
		$sql = "SELECT `id_map_val` FROM `ltp_map_vals`
				WHERE `id_map` = ".$this->db->escape($vars['id_map'])."
				AND `id_map_set_val` = ".$this->db->escape($vars['id_map_set_val']);
		$query = $this->db->query($sql,false);
		if($query -> num_rows() > 0){
			$r = $query->result_array();
			return $r[0]['id_map_val'];
		}
	}

	return null;
}


function save_map_val($data=NULL){
	$post_check 				= $this->input->post('posted');
	$db_update 					= false;
	if(!empty($_SESSION['logged_in'])){
		$user								= $_SESSION['logged_in'];
	}elseif(!empty($_SESSION['user'])){
		$user								= $_SESSION['user'];
	}else{
		$user['id_people']					= 1;
	}

	if(isset($post_check) && empty($data)){
	 $data 						= $this->input->post();
	}

	$all_data					= $data;
	$vars						= $data;

	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_map_vals');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}

	//Try to find existing map value
	if(empty($data['id_map_val'])){
		$data['id_map_val']	= $this->get_map_val_id($data);
	}

	$data['date_mod'] 			= time();
	$data['id_mod']				= $user['id_people'];

	if(!isset($data['state'])){
		$data['state'] 				= 1;
		$adata['state'] 			= 1;
	}

	//Check to update table first
	if(!empty($data['id_map_val'])){

		$this->db->where('id_map_val', $data['id_map_val']);
		if($this->db->update('ltp_map_vals', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_map_val']			= $data['id_map_val'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
			$data['date_add'] 				= time();
			$data['id_add']					= $user['id_people'];


		if ($this->db->insert('ltp_map_vals', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_map_val']			= $this->db->insert_id();
			$result['result']				= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['data']['id_map_val']			= $result['id_map_val'];

	return $result;
 }


 function get_map_id($vars){
	if(!empty($vars['map_qtr']) && (!empty($vars['id_affiliate']) || !empty($vars['id_church']))){
		$sql = "SELECT `id_map` FROM `ltp_maps`
				WHERE `map_qtr` = ".$this->db->escape($vars['map_qtr']);

		if(!empty($vars['id_church'])){
			$sql .= " AND `id_church` = ".$this->db->escape($vars['id_church']);
		}
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND `id_affiliate` = ".$this->db->escape($vars['id_affiliate']);
		}
		$query = $this->db->query($sql,false);
		if($query -> num_rows() > 0){
			$r = $query->result_array();
			return $r[0]['id_map'];
		}
	}

	return null;
}

 function save_map($data=NULL){
	$post_check 				= $this->input->post('posted');
	$db_update 					= false;
	if(!empty($_SESSION['logged_in'])){
		$user								= $_SESSION['logged_in'];
	}elseif(!empty($_SESSION['user'])){
		$user								= $_SESSION['user'];
	}else{
		$user['id_people']					= 1;
	}

	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}



	$all_data					= $data;
	$vars						= $data;

	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_maps');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}

	//Try to find existing map entry
	if(empty($data['id_map'])){
		$data['id_map']	= $this->get_map_id($data);
	}

	$data['date_mod'] 			= time();
	$data['id_mod']				= $user['id_people'];

	if(isset($vars['force_state'])){
		$data['state'] 				= $vars['force_state'];
	}elseif(!isset($data['state'])){
		$data['state'] 				= 1;
	}

	//Check to update table first
	if(!empty($data['id_map'])){

		$this->db->where('id_map', $data['id_map']);
		if($this->db->update('ltp_maps', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_map']				= $data['id_map'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
			$data['date_add'] 				= time();
			$data['id_add']					= $user['id_people'];


		if ($this->db->insert('ltp_maps', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_map']				= $this->db->insert_id();
			$result['result']				= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['data']['id_map']				= $result['id_map'];




	return $result;
 }


	function get_data_awareness_events($vars){
		$count						= 0;
		$title						= 'Awareness Events';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$date_params				= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		$data['date_range']			= ' e.`event_date_start` >= '.$date_params['date_add_start'].' AND e.`event_date_start` <= '.$date_params['date_add_end'].'';
		$data['date_range_start']	= $date_params['date_add_start'];
		$data['date_range_end']		= $date_params['date_add_end'];
		$data['event_types']		= array('event_awareness', 'event_combined');
		$data['state'] 				= 25;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		//$data['debug'] = 1;

		if(!empty($vars['id_church'])){
			$data['id_church']	= $vars['id_church'];
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		$items 			= $this->events_model->get_events($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['event_date_start']).': '.$this->events_model->get_event_name($cur);
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}

		return array('count' => $count, 'data' => $items, 'title' => $title);

	}

	function get_data_churches_engaged($vars){
		$count					= 0;
		$title					= 'New Churches Engaged';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$date_params			= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']	= $_SESSION['affiliate']['id_affiliate'];
		$data['date_range']		= ' c.`date_add` >= '.$date_params['date_add_start'].' AND c.`date_add` <= '.$date_params['date_add_end'].'';
		$data['state'] 			= 10;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		$items 			= $this->churches_model->get_churches($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['assign_date_add']).': '.$this->churches_model->get_church_name($cur);
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}

		return array('count' => $count, 'data' => $items, 'title' => $title);

	}

	function get_data_churches_equipped($vars){
		$count					= 0;
		$title					= 'New Churches Equipped';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$date_params			= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']	= $_SESSION['affiliate']['id_affiliate'];
		$data['date_range']		= ' c.`date_start` >= '.$date_params['date_add_start'].' AND c.`date_start` <= '.$date_params['date_add_end'].'';
		$data['state'] 			= 40;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		$items 			= $this->churches_model->get_churches($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['assign_date_add']).': '.$this->churches_model->get_church_name($cur);
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}

		return array('count' => $count, 'data' => $items, 'title' => $title);

	}

	function get_data_advocates_trained($vars){
		$count						= 0;
		$title						= 'New Advocates Trained';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$date_params				= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		$data['assignment_type']	= 'people_to_church';
		$data['role_scope']			= 'advocate';
		$data['date_range']			= ' a.`date_add` >= '.$date_params['date_add_start'].' AND a.`date_add` <= '.$date_params['date_add_end'].'';
		$data['group_by']			= 'a.id_people';

		//$data['debug'] = 1;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		if(!empty($vars['id_church'])){
			$data['id_church']	= $vars['id_church'];
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		$items 			= $this->people_model->get_assignments($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['assign_date_add']).': '.$cur['name_first'].' '.$cur['name_last'];
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}
		return array('count' => $count, 'data' => $items, 'title' => $title);
	}

	function get_data_cc_volunteers($vars){
		$count						= 0;
		$title						= 'New Care Community Volunteers';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$date_params				= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		$data['assignment_type']	= 'people_to_community';
		$data['role_scope']			= 'community_volunteer';
		$data['date_range']			= ' a.`date_add` >= '.$date_params['date_add_start'].' AND a.`date_add` <= '.$date_params['date_add_end'].'';
		$data['group_by']			= 'a.id_people';
		$data['debug']				= 0;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		if(!empty($vars['id_church'])){
			$data['id_church']	= $vars['id_church'];
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		//$data['debug'] =1;

		$items 			= $this->people_model->get_assignments($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['assign_date_add']).': '.$cur['name_first'].' '.$cur['name_last'];
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}
		return array('count' => $count, 'data' => $items, 'title' => $title);
	}


	function get_data_new_trained_volunteers($vars){
		$count						= 0;
		$title						= 'New Prepared Volunteers';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$vars['debug']				= 1;
		$date_params				= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		$data['assignment_type']	= 'people_to_church';
		$data['role_scope']			= 'community_volunteer';
		$data['date_range']			= ' a.`date_add` >= '.$date_params['date_add_start'].' AND a.`date_add` <= '.$date_params['date_add_end'].'';
		$data['group_by']			= 'a.id_people';
		$data['order']				= 'a.date_add';
		$data['order_dir']			= 'ASC';
		$data['debug']				= 0;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		if(!empty($vars['id_church'])){
			$data['id_church']	= $vars['id_church'];
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		$items 			= $this->people_model->get_assignments($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['assign_date_add']).': '.$cur['name_first'].' '.$cur['name_last'];
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}
		return array('count' => $count, 'data' => $items, 'title' => $title);
	}

	function get_data_cc_launched($vars){
		$count						= 0;
		$title						= 'New Care Communities Launched';
		if(empty($vars['use_qtrs'])){
			$vars['range']			= 'yearfromqtr';
		}
		$vars['debug']				= 1;
		$date_params				= $this->reports_model->get_date_range_params($vars);
		$data['id_affiliate']		= $this->affiliates_model->get_active_affiliate_id();
		$data['date_range']			= ' c.`date_start` >= '.$date_params['date_add_start'].' AND c.`date_start` <= '.$date_params['date_add_end'].'';
		$data['group_by']			= 'c.id_community';$data['group_by']			= 'c.id_community';
		//$data['debug']				= 1;

		if(!empty($date_params['title'])){
			if(isset($vars['use_qtrs']) && $vars['use_qtrs']){
				$title .= ' '.$date_params['qtr_name'].' '.$date_params['qtr_year'];
			}else{
				$title .= ' '.$date_params['qtr_year'];
			}
		}

		if(!empty($vars['id_church'])){
			$data['id_church']	= $vars['id_church'];
		}

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}

		$items 			= $this->communities_model->get_communities($data);
		if(!empty($items)){
			$count = count($items);
			foreach($items as $key => $cur){
				$items[$key]['text_formatted']	= date_offset('m/d/Y',$cur['date_add']).': '.$this->communities_model->get_community_name($cur);
			}
		}

		if(!empty($vars['count_only'])){
			return $count;
		}



		return array('count' => $count, 'data' => $items, 'title' => $title);
	}

	function get_map_set_response_values($vars){

		$sql_qtrs		= date('Y').'1';
		if(!empty($date_params['qtr_year'])){
			$sql_qtrs	= '';
			for($i=1; $i < 5; $i++){
				$sql_qtrs .= $date_params['qtr_year'].$i.',';
			}
		}


		$sql = "SELECT mset.id_map_set_key, val.*, map.map_qtr
		FROM ltp_map_vals AS val
		LEFT JOIN ltp_maps AS map ON val.id_map = map.id_map
		LEFT JOIN ltp_map_set_vals AS mset ON mset.id_map_set_val = val.id_map_set_val
		WHERE 1=1
		AND map.map_qtr IN ( ".rtrim($sql_qtrs, ',').")";
		if(!empty($vars['id_church'])){
			$sql .= " AND map.id_church = ".$this->db->escape($vars['id_church']);
		}
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND map.id_affiliate = ".$this->db->escape($vars['id_affiliate']);
		}
		if(!empty($vars['map_type'])){
			$sql .= " AND map.map_type = ".$this->db->escape($vars['map_type']);
		}
		$sql .= " ORDER BY map.map_qtr DESC";
		$query = $this->db->query($sql,false);
		if($query -> num_rows() > 0){
			$r = $query->result_array();
		}

	}



	function get_goals($vars){
		$items					= $this->get_map_set_key_schema($vars);
		$count					= 0;
		$date_params			= $this->reports_model->get_date_range_params($vars);

		$data['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
		//$data['date_range']		= ' c.`date_add` >= '.$date_params['date_add_start'].' AND c.`date_add` <= '.$date_params['date_add_end'].'';
		//$data['state'] 			= 10;

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}


		$sql_qtrs		= date('Y').'1';
		if(!empty($date_params['qtr_year'])){
			$sql_qtrs	= '';
			for($i=1; $i < 5; $i++){
				$sql_qtrs .= $date_params['qtr_year'].$i.',';
			}
		}


		$sql = "SELECT mset.id_map_set_key, val.*, map.map_qtr
		FROM ltp_map_vals AS val
		LEFT JOIN ltp_maps AS map ON val.id_map = map.id_map
		LEFT JOIN ltp_map_set_vals AS mset ON mset.id_map_set_val = val.id_map_set_val
		WHERE 1=1
		AND map.map_qtr IN ( ".rtrim($sql_qtrs, ',').")";
		if(!empty($vars['id_church'])){
			$sql .= " AND map.id_church = ".$this->db->escape($vars['id_church']);
		}
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND map.id_affiliate = ".$this->db->escape($vars['id_affiliate']);
		}
		if(!empty($vars['map_type'])){
			$sql .= " AND map.map_type = ".$this->db->escape($vars['map_type']);
		}
		$sql .= " ORDER BY map.map_qtr DESC";


		$query = $this->db->query($sql,false);
		if($query -> num_rows() > 0){
			$r = $query->result_array();



			foreach($r as $cur){
				$key 	= $cur['id_map_set_key'];
				if(stripos($key, 'goal_') !== false){
					if(empty($items[$key])){
						$items[$key]		= $cur['map_val'];
					}
				}
			}
		}elseif(empty($vars['retry'])){
			$vars['retry']	= 1;
			$vars['qtr']	= ($date_params['qtr_year']	- 1).'1';
			return $this->get_goals($vars);
		}

		return $items;

	}

	function get_actuals($vars){
		$items					= $this->get_map_set_key_schema($vars);
		$count					= 0;
		$date_params			= $this->reports_model->get_date_range_params($vars);

		$data['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
		//$data['date_range']		= ' c.`date_add` >= '.$date_params['date_add_start'].' AND c.`date_add` <= '.$date_params['date_add_end'].'';
		//$data['state'] 			= 10;

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}


		$sql_qtrs		= date('Y').'1';
		if(!empty($date_params['qtr_year'])){
			$sql_qtrs	= '';
			for($i=1; $i < 5; $i++){
				$sql_qtrs .= $date_params['qtr_year'].$i.',';
			}
		}


		$sql = "SELECT mset.id_map_set_key, val.*, map.map_qtr
		FROM ltp_map_vals AS val
		LEFT JOIN ltp_maps AS map ON val.id_map = map.id_map
		LEFT JOIN ltp_map_set_vals AS mset ON mset.id_map_set_val = val.id_map_set_val
		WHERE 1=1
		AND map.map_qtr IN ( ".rtrim($sql_qtrs, ',').")";
		if(!empty($vars['id_church'])){
			$sql .= " AND map.id_church = ".$this->db->escape($vars['id_church']);
		}
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND map.id_affiliate = ".$this->db->escape($vars['id_affiliate']);
		}
		if(!empty($vars['map_type'])){
			$sql .= " AND map.map_type = ".$this->db->escape($vars['map_type']);
		}
		$sql .= " ORDER BY map.map_qtr DESC";

		$query = $this->db->query($sql,false);
		if($query -> num_rows() > 0){
			$r = $query->result_array();




			foreach($r as $cur){
				$key 	= $cur['id_map_set_key'];
				if(stripos($key, 'actual_') !== false){
					if(!isset($items[$key])){
						$items[$key]	= 0;
					}
					$items[$key] += $cur['map_val'];
				}
			}
		}


		return $items;

	}

	function get_totals($vars){
		$items					= $this->get_map_set_key_schema($vars);
		$count					= 0;
		$date_params			= $this->reports_model->get_date_range_params($vars);
		$has_data				= false;

		$data['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
		//$data['date_range']		= ' c.`date_add` >= '.$date_params['date_add_start'].' AND c.`date_add` <= '.$date_params['date_add_end'].'';
		//$data['state'] 			= 10;

		if(!empty($vars['id_affiliate'])){
			$data['id_affiliate']	= $vars['id_affiliate'];
		}


		$sql_qtrs		= date('Y').'1';
		if(!empty($date_params['qtr_year'])){
			$sql_qtrs	= '';
			for($i=1; $i < 5; $i++){
				$sql_qtrs .= $date_params['qtr_year'].$i.',';
			}
		}


		$r = $this->get_cumulative_map_data($vars);



		if(!empty($r)){
			foreach($r as $cur){
				$key 		= $cur['id_map_set_key'];
				$key_alt	= str_replace('cumulative_', 'total_', $key);
				if(stripos($key, 'cumulative_') !== false){
					if(!empty($cur['map_val']) && empty($items[$key])){
						if(is_numeric($cur['map_val'])){
							$items[$key] 		= number_format($cur['map_val']);
							$items[$key_alt] 	= number_format($cur['map_val']);
						}else{
							$items[$key] 		= $cur['map_val'];
							$items[$key_alt] 	= $cur['map_val'];
						}
						$has_data			= true;
					}
				}
			}
		}
		/*
		$sql = "SELECT mset.id_map_set_key, val.*, map.map_qtr
		FROM ltp_map_vals AS val
		LEFT JOIN ltp_maps AS map ON val.id_map = map.id_map
		LEFT JOIN ltp_map_set_vals AS mset ON mset.id_map_set_val = val.id_map_set_val
		WHERE 1=1";
		if(!empty($vars['id_church'])){
			$sql .= " AND map.id_church = ".$this->db->escape($vars['id_church']);
		}
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND map.id_affiliate = ".$this->db->escape($vars['id_affiliate']);
		}
		if(!empty($vars['map_type'])){
			$sql .= " AND map.map_type = ".$this->db->escape($vars['map_type']);
		}
		$sql .= " ORDER BY map.map_qtr DESC";

		$query = $this->db->query($sql,false);
		if($query -> num_rows() > 0){
			$r = $query->result_array();
			foreach($r as $cur){
				$key 		= $cur['id_map_set_key'];
				$key_alt	= str_replace('cumulative_', 'total_', $key);
				if(stripos($key, 'cumulative_') !== false){
					if(!empty($cur['map_val'])){
						$items[$key] 		= number_format($cur['map_val']);
						$items[$key_alt] 	= number_format($cur['map_val']);
					}
				}
			}
		}
		*/


		return $items;


		switch($vars['mode']){
			case 'affiliate':
				$sql = "SELECT mset.id_map_set_key, val.*, map.map_qtr
				FROM ltp_map_vals AS val
				LEFT JOIN ltp_maps AS map ON val.id_map = map.id_map
				LEFT JOIN ltp_map_set_vals AS mset ON mset.id_map_set_val = val.id_map_set_val
				WHERE map.id_affiliate = ".$this->db->escape($data['id_affiliate'])."
				AND map.map_qtr IN ( ".rtrim($sql_qtrs, ',').")
				ORDER BY map.map_qtr DESC";
				$query = $this->db->query($sql,false);
				if($query -> num_rows() > 0){
					$r = $query->result_array();

					foreach($r as $cur){
						$key 	= $cur['id_map_set_key'];
						if(stripos($key, 'actual_') !== false){
							if(empty($items[$key])){
								$items[$key]		= 0;
							}
							$items[$key] += $cur['map_val'];
						}
					}
				}

				return $items;
			break;
			case 'church':

			break;
		}


		//$items 			= $this->churches_model->get_churches($data);
		if(!empty($items)){
			$count = count($items);
		}

		if(!empty($vars['count_only'])){
			return $count;
		}

		return array('count' => $count, 'data' => $items);

	}


	function get_map_set_key_schema($vars){
		$arr 	= array();
		$sql 	= "SELECT * FROM ltp_map_set_vals AS mset WHERE mset.id_map_set = ".$this->db->escape($vars['id_map_set']);
		$query 	= $this->db->query($sql,false);

		if($query -> num_rows() > 0){
			$r = $query->result_array();
			foreach($r as $cur){
				$key 		= $cur['id_map_set_key'];
				$key_alt	= str_replace('cumulative_', 'total_', $key);
				$arr[$key]	= 0;
				$arr[$key_alt]	= 0;

			}
		}

		return $arr;
	}


	function get_map_set_key_vals($vars){
		$arr 	= array();
		$sql 	= "SELECT * FROM ltp_map_set_vals AS mset WHERE mset.id_map_set = ".$this->db->escape($vars['id_map_set']);
		$query 	= $this->db->query($sql,false);

		if($query -> num_rows() > 0){
			$r = $query->result_array();
			return $r;
		}

		return $arr;
	}

	function get_goals_cc_launched($vars){
		$vars['view']	= 'cc_launched';
		return $this->get_goals($vars);
	}

	function get_goals_cc_volunteers($vars){
		$vars['view']	= 'cc_volunteers';
		return $this->get_goals($vars);
	}

	function get_goals_advocates_trained($vars){
		$vars['view']	= 'advocates_trained';
		return $this->get_goals($vars);
	}

	function get_goals_churches_engaged($vars){
		$vars['view']	= 'churches_engaged';
		return $this->get_goals($vars);
	}

	function get_goals_churches_equipped($vars){
		$vars['view']	= 'churches_engaged';
		return $this->get_goals($vars);
	}


	function get_ps_supplemental_data($vars){
		$vars['count_only']	= 1;
		if(!empty($vars['supplement_mode'])){
			switch(strtolower($vars['supplement_mode'])){
				case 'actual_events_awareness':
					$r = $this->maps_model->get_data_awareness_events($vars);
				break;
				case 'actual_new_care_communities':
					$r = $this->maps_model->get_data_cc_launched($vars);
				break;
				case 'actual_new_trained_vols':
					$r = $this->maps_model->get_data_new_trained_volunteers($vars);
				break;
				case 'actual_new_advocates':
					$r = $this->maps_model->get_data_advocates_trained($vars);
				break;
				default:
					$r['actual_new_care_communities'] 	= $this->maps_model->get_data_awareness_events($vars);
					$r['actual_new_care_communities'] 	= $this->maps_model->get_data_cc_launched($vars);
					$r['actual_new_trained_vols']		= $this->maps_model->get_data_new_trained_volunteers($vars);
					$r['actual_new_advocates']			= $this->maps_model->get_data_advocates_trained($vars);
					$r['ps_supplemental_fields']		= array('actual_events_awareness', 'actual_new_care_communities', 'actual_new_trained_vols', 'actual_new_advocates');
				break;
			}

			if(!empty($r)){
				return $r;
			}
		}


		return 0;
	}

	function has_first_map($vars){

		if(!empty($vars['id_church'])){
			$map_type 		= 'church';
			$maps 			= $this->get_maps(array('id_church' => $vars['id_church'], 'map_type' => 'church'));
		}else{
			$map_type 		= 'affiliate';
			$maps 			= $this->get_maps(array('id_affiliate' => $vars['id_affiliate'], 'map_type' => 'affiliate'));
		}


		if(!empty($maps)){
			foreach($maps as $cur){
				if(!empty($cur['is_first'])){
					return true;
				}
			}
		}

		return false;

	}

	function is_first_map($vars){

		if(!empty($vars['id_church'])){
			$map_type 		= 'church';
			$maps 			= $this->get_maps(array('id_church' => $vars['id_church'], 'map_type' => 'church'));
		}else{
			$map_type 		= 'affiliate';
			$maps 			= $this->get_maps(array('id_affiliate' => $vars['id_affiliate'], 'map_type' => 'affiliate'));
		}


		if(!empty($maps)){
			foreach($maps as $cur){
				if(!empty($cur['is_first'])){
					return false;
				}
			}
		}

		return true;

	}

	function get_catchup_data($vars){
		$vars 	= format_array_vals($vars, 'id_church');
		$r 		= array();


		if(!empty($vars['id_church'])){
			$csv							= file_get_contents(FCPATH.DS.'uploads'.DS.'map_qes_catchup_data.csv');
			$data['csv']					= $this->website_model->parse_csv($csv);
			unset($csv);

			if(!empty($data['csv'])){
				foreach($data['csv'] AS $cur){

					if($cur[0] == $vars['id_church']){
						$r[]	= array(
											'id_map_set_val' => 47,
											'map_val' => $cur[4],
											'state' => 1,
											'id_map_set_key' => 'cumulative_new_care_communities',
											'id_map_set_name' => 'New Care Communities',
											'id_church' => $vars['id_church'],
											'map_type' => 'church'
										);
						$r[]	= array(
											'id_map_set_val' => 48,
											'map_val' => $cur[5],
											'state' => 1,
											'id_map_set_key' => 'cumulative_new_approved_ff',
											'id_map_set_name' => 'New Approved Foster Families',
											'id_church' => $vars['id_church'],
											'map_type' => 'church'
										);

						$r[]	= array(
											'id_map_set_val' => 52,
											'map_val' => $cur[3],
											'state' => 1,
											'id_map_set_key' => 'cumulative_ministry_budget_external',
											'id_map_set_name' => 'External Ministry Budget',
											'id_church' => $vars['id_church'],
											'map_type' => 'church'
										);

						/*
						$r['id_church']														= $cur[0];
						$r['church_name']													= $cur[1];
						$r['date_start']														= $cur[2];
						$r['cumulative_new_care_communities']				= $cur[4];
						$r['cumulative_new_approved_ff']							= $cur[5];
						$r['cumulative_ministry_budget_external']				= $cur[5];
						*/
					}
				}
			}
		}



		return $r;
	}

	function get_jan_july($vars){
		//dds($vars);

		if(!empty($vars['qtr_name'])){
			$vars['qtr']	= str_replace('Q', '', $vars['qtr_name']);
		}
		if(!empty($vars['qtr'])){

			switch($vars['qtr']){
				case 1:
				case 2:
					return 'Jul';
				break;
				case 3:
				case 4:
				case 0:
					return 'Jan';
				break;
			}
		}
		return 'Jan';
	}

	function get_today_dec($vars){
		//dds($vars);

		if(!empty($vars['qtr_name'])){
			$vars['qtr']	= str_replace('Q', '', $vars['qtr_name']);
		}

		if(!empty($vars['is_first'])){
			return 'Today';
		}

		if(!empty($vars['qtr'])){

			switch($vars['qtr']){
				case 1:
				case 2:
					return 'Dec 31, '.($vars['qtr_year'] - 1);
				break;
				case 3:
				case 4:
				case 0:
					return 'Today';
				break;
			}
		}
		return 'Jan';
	}


}//End Class
?>
```
