<?php
Class Regions_model extends CI_Model
{
 function get_regions($vars=null){
	
	$sql = "SELECT c.*, 
	aff.region_name, c.state as `region_state`, 
	p.name_first AS manager_name_first, 
	p.name_last AS manager_name_last,
	a.id_affiliate
	FROM `ltp_regions` AS c 
	LEFT JOIN `ltp_regions` AS aff ON aff.id_region = c.id_region 
	LEFT JOIN `ltp_assignments` AS a ON a.id_region = c.id_region
	LEFT JOIN `ltp_people` AS p ON c.id_region_manager = p.id_people 
	WHERE c.`id_region` > '0'";
	
	if(!empty($vars['id_people'])){
		$sql .= " AND a.id_people =  ".$this->db->escape($vars['id_people']);
	}
	if(!empty($vars['id_community'])){
		$sql .= " AND a.id_community =  ".$this->db->escape($vars['id_community']);
	}
	if(!empty($vars['id_church'])){
		$sql .= " AND a.assignment_type = 'church_to_region' AND a.id_church =  ".$this->db->escape($vars['id_church']);
	}
	if(!empty($vars['id_region'])){
		$sql .= " AND c.id_region =  ".$this->db->escape($vars['id_region']);
	}
	if(!empty($vars['id_role'])){
		$sql .= " AND a.id_role =  ".$this->db->escape($vars['id_role']);
	}
	if(isset($vars['state'])){
		$sql .= " AND c.state = ".$this->db->escape($vars['state']);
	}else{
		$sql .= " AND c.state > 0";
	}
	if(empty($vars['bypass_affiliate'])){
		if(!empty($vars['id_affiliate'])){
			$sql .= " AND a.id_affiliate =  ".$this->db->escape($vars['id_affiliate']);
		}elseif(!empty($_SESSION['affiliate']['id_affiliate']) && !$this->security_model->user_has_access(95)){
			$sql .= " AND a.id_affiliate =  ".$this->db->escape($_SESSION['affiliate']['id_affiliate']);
		}
	}
	$sql .= " GROUP BY c.id_region";
	
	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$this->db->escape($vars['order']);
	}else{
		$sql .= " ORDER BY c.region_name";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$this->db->escape($vars['order_dir']);
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
		echo '<p><strong>regions_model->get_regions: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>regions_model->get_regions: </strong>'.$sql.'</p>';
	}


   if($query -> num_rows() > 0){
	   
		$r = $query->result_array();
	
		foreach($r as $key => $val){
			$r[$key]['id_region_encoded']		= url_enc($r[$key]['id_region']);
		}
		
		return $r;
	 
   }else{
		return null;
   }
 }
 
function get_region($vars=null){
	
	$result = $this->get_regions($vars);


   if(!empty($result)){
	   $r = $result[0];
     return $r;
	 
   }else{
     return false;
   }
 }
 
  
 function save_region($data=NULL){
	$post_check 						= $this->input->post('posted');
	$db_update 							= false;
	$password							= null;
	$reset_password 					= false;
	$data['user']						= $_SESSION['logged_in'];
	$user								= $data['user'];
	
	if(isset($post_check)){
	 $data 						= $this->input->post();
	}
	
	if(isset($data['region_state'])){
		$data['state'] 				= $data['region_state'];
	}elseif(!isset($data['state'])){
		$data['state'] 				= 1;
	}
	
	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_regions');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}
	$data['id_mod']			= $user['id_people']; 
	$data['date_mod'] 		= time();
	
	
	//Check to update table first
	if(!empty($data['id_region'])){
		$cur_region					= $this->get_regions(array('id_region' => $data['id_region']));
		
		
		$this->db->where('id_region', $data['id_region']);
		if($this->db->update('ltp_regions', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 					= TRUE;
			$result['id_region']				= $data['id_region'];
			$result['result']						= 'success';
			$result['method']					= 'update';
			$result['data']						= $data;
		}

	}else{
		$data['id_add']							= $user['id_people'];
		$data['date_add'] 					= time();
		
		
		if ($this->db->insert('ltp_regions', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 					= TRUE;
			$result['id_region']				= $this->db->insert_id();
			$result['result']						= 'success';
			$result['method']					= 'insert';
			$result['data']						= $data;
		}
	}
	
	if($result['db_update']){
		$assign['id_region']					= $result['id_region'];
		$assign['assignment_type']		= 'region_to_affiliate';
		if(!empty($vars['id_affiliate'])){
			$assign['id_affiliate']				= $vars['id_affiliate'];
		}else{
			$assign['id_affiliate']				= $_SESSION['affiliate']['id_affiliate'];
		}
		$this->website_model->save_assignment($assign);
	}
	
	$result['data']							= $data;
	
	return $result;
 } 
 
 function get_region_name($vars){
	if(!empty($vars['campus_name'])){
		$cur_name 	= $vars['region_name'].' - '.$vars['campus_name'];
	}else{
		$cur_name	= $vars['region_name'];
	}	
	
	return $cur_name;
 }
 
 function get_regional_manager_name($vars){
	if(!empty($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars['id_region']	= $new;
	}
	$cur_name = null;
	
	$region = $this->get_region($vars);

	if(!empty($region['manager_name_first'])){
		$cur_name = $region['manager_name_first'];
	}
	if(!empty($region['manager_name_last'])){
		$cur_name .= ' '.$this->website_model->display_format_people_name_last($region['manager_name_first']);
	}
	return $cur_name;
 }
 
 function get_region_status_from_state($list){
		$status 	= '';
		
		if(isset($list['region_state'])){
			$list['state']				= $list['region_state'];
		}

		switch($list['state']){
			 case '-2':
				$status				= 'Deleted';
			 break;
			 case '1':
				$status				= 'Not Set';
			 break;	 
			 case '10':
				$status				= 'Prospect';
			 break;	
			 case '22':
				$status				= 'On Hold';
			 break;			
			 case '24':
				$status				= 'Closed';
			 break;		 	 
			 case '40':
				$status				= 'Active';
			 break;
		 }
			 
		 return $status;
	}
	
	function get_regions_by_manager($vars){
		$r 		= array();
		$vars 	= format_array_vals($vars, 'id_people');
		
		if(!empty($vars['id_people'])){
			$regions = $this->get_regions();
			if(!empty($regions)){
				foreach($regions as $cur){
					if($cur['id_region_manager'] == $vars['id_people']){
						$r[]	 = $cur;
					}
				}
			}
		}
		
		return $r;
	}
}//End Class
?>