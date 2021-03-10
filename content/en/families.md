```php
<?php
Class Families_model extends CI_Model
{
 function get_families($vars=null){

	 if(!empty($vars['id_church'])){
		if(strpos($vars['id_church'], 'parent_') !== false){
			$vars['id_church']			= str_replace('parent_', '', $vars['id_church']);
			$possible_church_ids		= $this->churches_model->get_all_campus_church_ids(array('id_church_parent' => $vars['id_church'], 'include_parent' => 1));
			if(!empty($possible_church_ids)){
				$possible_church_ids	= implode(',',array_unique($possible_church_ids));
			}
		}else{
			$possible_church_ids		= $vars['id_church'];
		}
	 }

	if(empty($vars['family_state']) && !empty($vars['family_status'])){
		$vars['family_state']	= $vars['family_status'];
	}

	if(empty($vars['bypass_precheck']) && (!empty($vars['id_family']) || !empty($vars['id_church']) || !empty($vars['id_assignment']) || !empty($vars['id_role']) || !empty($vars['with_assignments']))){

		//Pre-check for families that might be served by a church
		if(!empty($vars['id_church']) && empty($vars['id_families'])){
			$vars['id_families']	= array();

			$sql = "SELECT com.`id_family` FROM  ltp_assignments AS com
					INNER JOIN `ltp_assignments` AS church ON church.id_community = com.id_community AND church.assignment_type = 'community_to_church'
					WHERE com.`id_church` IN (".$possible_church_ids.") AND com.assignment_type = 'family_to_community' AND com.`state` > '0'";

			$query = $this->db->query($sql,false);

			if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
				echo '<p><strong>families_model->get_families (pre-check): </strong>'.$sql.'</p>';
				exit();
			}elseif(!empty($vars['debug'])){
				echo '<p><strong>families_model->get_families (pre-check): </strong>'.$sql.'</p>';
				echo '<p><strong>families_model->$possible_church_ids: </strong>'.$possible_church_ids.'</p>';
			}


			if($query -> num_rows() > 0){
				$families_served = $query->result_array();
				foreach($families_served as $cur_fam){
					if(!empty($cur_fam['id_family'])){
						$vars['id_families'][] 	= $cur_fam['id_family'];
					}
				}

				$vars['id_families'] 	= array_unique($vars['id_families']);
				$vars['id_families']	= implode(',',$vars['id_families']);
			}
		}

		//dds($vars['families']);


		$sql = "SELECT c.*,
		c.state AS `family_state`,
		aagency.id_agency,
		agency.agency_name,
		p.address_street_1 AS `family_address_street_1`,
		p.address_street_2 AS `family_address_street_2`,
		p.address_city  AS `family_address_city`,
		p.address_state  AS `family_address_state`,
		p.address_zip AS `family_address_zip`,
		p.address_county AS `family_address_county`,
		p.address_country AS `family_address_country`,
		p.address_access_instructions AS `family_address_access_instructions`,
		place.place_street_number AS `family_place_street_number`,
		place.place_street AS `family_place_street`,
		place.place_city  AS `family_place_city`,
		place.place_state  AS `family_place_state`,
		place.place_zip AS `family_place_zip`,
		place.place_lat AS `family_place_lat`,
		place.place_lng AS `family_place_lng`,
		place.place_county AS `family_place_county`,
		place.place_country AS `family_place_country`,
		place.place_access_instructions,
		a.id_affiliate AS `assign_id_affiliate`
		FROM `ltp_families` AS c
		LEFT JOIN `ltp_people` AS p ON p.id_people = c.id_people_primary
		LEFT JOIN `ltp_assignments` AS a ON a.id_family = c.id_family AND a.assignment_type = 'family_to_affiliate'
		LEFT JOIN `ltp_assignments` AS aagency ON aagency.id_family = c.id_family AND aagency.assignment_type = 'family_to_agency' AND aagency.id_agency > '0'
		LEFT JOIN `ltp_assignments` AS achurch ON achurch.id_family = c.id_family AND achurch.assignment_type = 'family_to_church'
		LEFT JOIN `ltp_assignments` AS aneed ON aneed.id_family = c.id_family AND aneed.assignment_type = 'need_to_family'
		LEFT JOIN `ltp_needs` AS need ON aneed.id_need = need.id_need
		LEFT JOIN `ltp_places` AS place ON place.id_place = c.id_place
		LEFT JOIN `ltp_agencies` AS agency ON agency.id_agency = aagency.id_agency";

		//Remove this line to fix problems where families with no agency assignment would not show up. AND a.assignment_type = 'family_to_agency'

		$sql .= " WHERE c.`id_family` > '0'";

		$vars['group_by']	= 'family';

	}else{
		$sql = "SELECT c.*, c.state AS `family_state`,
		p.address_street_1 AS `family_address_street_1`,
		p.address_street_2 AS `family_address_street_2`,
		p.address_city  AS `family_address_city`,
		p.address_state  AS `family_address_state`,
		p.address_zip AS `family_address_zip`,
		place.place_street_number AS `family_place_street_number`,
		place.place_street AS `family_place_street`,
		place.place_city  AS `family_place_city`,
		place.place_state  AS `family_place_state`,
		place.place_zip AS `family_place_zip`,
		place.place_lat AS `family_place_lat`,
		place.place_lng AS `family_place_lng`,
		place.place_county AS `family_place_county`,
		place.place_country AS `family_place_country`,
		p.address_access_instructions AS `family_address_access_instructions`,
		a.id_affiliate AS `assign_id_affiliate`,
		agency.agency_name,
		aagency.id_agency,
		homechurch.church_name AS home_church_name,
		homechurch.campus_name AS home_campus_name,
		homechurch.id_church as id_home_church,
		need.date_add AS need_date_add
		FROM `ltp_families` AS c
		LEFT JOIN `ltp_assignments` AS a ON a.id_family = c.id_family AND a.assignment_type = 'family_to_affiliate'
		LEFT JOIN `ltp_assignments` AS aagency ON aagency.id_family = c.id_family AND aagency.assignment_type = 'family_to_agency' AND aagency.id_agency > '0'
		LEFT JOIN `ltp_agencies` AS agency ON agency.id_agency = aagency.id_agency
		LEFT JOIN `ltp_assignments` AS achurch ON achurch.id_family = c.id_family AND achurch.assignment_type = 'family_to_church'
		LEFT JOIN `ltp_assignments` AS aneed ON aneed.id_family = c.id_family AND aneed.assignment_type = 'need_to_family'
		LEFT JOIN `ltp_needs` AS need ON aneed.id_need = need.id_need
		LEFT JOIN `ltp_places` AS place ON place.id_place = c.id_place
		LEFT JOIN `ltp_churches` AS homechurch ON c.id_church_home = homechurch.id_church
		LEFT JOIN `ltp_people` AS p ON p.id_people = c.id_people_primary WHERE c.`id_family` > '0'";
	}


	if(!empty($vars['view'])){
		switch(strtolower($vars['view'])){
			case 'dashboard_advocate_awaiting_families':
				if(!empty($possible_church_ids)){
					if(!empty($vars['hide_ignored'])){
						$sql .= " AND (achurch.id_assignment IS NULL OR achurch.id_role > '0')";
					}

					$sql .= " AND c.state IN (30, 42) AND c.state NOT IN (5,10,40,46,22,24,44,35) AND (c.id_church_recruited IN (".$possible_church_ids.") OR c.id_church_home IN (".$possible_church_ids.") OR c.id_church_add IN (".$possible_church_ids.")) GROUP BY c.id_family ";
					$vars['order'] 		= 'c.date_add' ;
					$vars['order_dir']	= 'ASC';
					$vars['limit']		= 20;
				}else{
					if(empty($vars['id_affiliate'])){
						$vars['id_affiliate']		= $this->affiliates_model->get_active_affiliate_id();
					}
					$sql .= " AND (a.id_affiliate = '".$vars['id_affiliate']."' OR achurch.id_affiliate = '".$vars['id_affiliate']."') AND c.state IN (30, 42) AND c.state NOT IN (5,10,40,46,22,24,44,35) GROUP BY c.id_family ORDER BY c.date_add DESC LIMIT 10 ";

					$vars['bypass_affiliate'] 	= 1;
					unset($vars['id_affiliate']);
				}

				//if(empty($vars['limit'])){
					//$vars['limit']		= 10;
				//}



			break;
			case 'care_requested':
				if(!empty($vars['id_need_type'])){
					$sql .= " AND need.id_need_type  = ".$this->db->escape($vars['id_need_type']);
				}else{
					$sql .= " AND ((need.id_need_type IN (101,102,103) AND c.state > 0 AND c.state < 40 AND c.state NOT IN (24,22)) OR c.state = '30')";
				}
				if(!empty($vars['id_church'])){
					$sql .= " AND c.id_church_home IN ($possible_church_ids)";
				}

			break;
			case 'care_requested_tcc':
				$sql .= " AND ((need.id_need_type IN (103) AND c.state > 0 AND c.state < 40 AND c.state NOT IN (24,22)) OR c.state = '30') ";
				if(!empty($vars['id_church'])){
					$sql .= " AND c.id_church_home IN ($possible_church_ids)";
				}
				$vars['group_by']	= 'family';

			break;
		}

		if(empty($vars['bypass_affiliate'])){
			if(!empty($vars['id_affiliates']) ){
				if(is_array($vars['id_affiliates'])){
					$vars['id_affiliates'] = trim(implode(',', $vars['id_affiliates']), ',');
				}
				$sql .= " AND a.id_affiliate IN (".$vars['id_affiliates'].")";
			}elseif(!empty($vars['id_affiliate'])){
				$sql .= " AND a.id_affiliate =  ".$this->db->escape($vars['id_affiliate']);
			}elseif(!empty($_SESSION['affiliate']['id_affiliate']) && !$this->security_model->user_has_access(95)){
				$sql .= " AND a.id_affiliate =  ".$this->db->escape($_SESSION['affiliate']['id_affiliate']);
			}
		}

	}else{


		if(!empty($vars['id_family'])){
			$sql .= " AND c.id_family =  ".$this->db->escape($vars['id_family']);
		}elseif($this->security_model->is_access_level_team_leader() && empty($vars['bypass_security']) && !empty($this->security_model->get_can_admin_families())){
			$id_families	= implode(',',$this->security_model->get_can_admin_families());
			$sql .= " AND c.id_family IN (".trim($id_families, ',').")";
		}else{

			if(!empty($possible_church_ids)){
				if(!empty($vars['id_families'])){
					$sql .= " AND (c.id_church_recruited IN (".$possible_church_ids.")
								OR c.id_church_home IN (".$possible_church_ids.")
								OR c.id_church_add IN (".$possible_church_ids.")
								OR c.id_church_claim IN (".$possible_church_ids.")
								OR c.id_family IN (".trim($vars['id_families'], ',')."))";
				}else{
					$sql .= " AND (c.id_church_recruited IN (".$possible_church_ids.")
									OR c.id_church_home IN (".$possible_church_ids.")
									OR c.id_church_claim IN (".$possible_church_ids.")
									OR c.id_church_add IN (".$possible_church_ids."))";
				}
			}elseif(!empty($vars['force_non_staff_primary_church']) && !empty($_SESSION['logged_in']['id_home_church']) && !$this->security_model->user_has_access(80)){
				$sql .= " AND (c.id_church_recruited IN (".$this->db->escape($_SESSION['logged_in']['id_home_church']).")
								OR c.id_church_claim IN (".$this->db->escape($_SESSION['logged_in']['id_home_church']).")
								OR c.id_church_add IN (".$this->db->escape($_SESSION['logged_in']['id_home_church']).")
								OR c.id_church_home IN (".$this->db->escape($_SESSION['logged_in']['id_home_church'])."))";

				if(empty($_SESSION['view_limiter']['id_church'])){
					$_SESSION['view_limiter']['id_church']	= $_SESSION['logged_in']['id_home_church'];
				}
			}

			/*
			if(!empty($vars['id_church'])){
				$sql .= " AND a.id_church =  ".$this->db->escape($vars['id_church']);
			}
			*/

			if(!empty($vars['params']['date_add_start']) || !empty($vars['params']['date_add_end'])){
			    if(!empty($vars['params']['date_add_start'])){
			        $sql .= " AND c.date_add  >= ".$this->db->escape($vars['params']['date_add_start']);
			    }
			    if(!empty($vars['params']['date_add_end'])){
			        $sql .= " AND c.`date_add` <= ".$this->db->escape($vars['params']['date_add_end']);
			    }
			}

			if(!empty($vars['id_salesforce'])){
				//$sql .= " AND c.id_salesforce =  ".$this->db->escape($vars['id_salesforce']);
				$sql .= " AND (c.id_salesforce =  ".$this->db->escape($vars['id_salesforce'])." OR SUBSTRING(c.id_salesforce,1,15) = ".$this->db->escape($vars['id_salesforce']).")";
			}
			if(!empty($vars['id_import_batch'])){
				$sql .= " AND c.id_import_batch =  ".$this->db->escape($vars['id_import_batch']);
			}
			if(!empty($vars['foster_family_home_type'])){
				$sql .= " AND c.family_type = ".$this->db->escape($vars['foster_family_home_type']);
			}

			if(!empty($vars['show_all'])){

			}elseif(!empty($vars['family_state'])){
				$sql .= " AND c.state = ".$this->db->escape($vars['family_state']);
			}elseif(!empty($vars['status'])){
				$sql .= " AND c.state = ".$this->db->escape($vars['status']);
			}elseif(!empty($vars['state'])){
				$sql .= " AND c.state = ".$this->db->escape($vars['state']);
				$sql .= " AND a.state = ".$this->db->escape($vars['state']);
			}else{
				$sql .= " AND c.state > 0";
			}

			if(!empty($vars['hide_ignored'])){
				$sql .= " AND (achurch.id_assignment IS NULL OR achurch.id_role > '0')";
			}


			if(!empty($vars['was_recruited'])){
				$sql .= " AND (c.recruited_by_church = '1' OR c.recruited_by_affiliate = '1' OR c.id_church_recruited > 0)";
			}

			if(!empty($vars['last_update'])){
				$sql .= " AND c.date_mod >=  ".$this->db->escape($vars['last_update']);
			}

			if(!empty($vars['search_name_last'])){
				$sql .= " AND ((LOWER(c.family_name) LIKE '%".strtolower($vars['search_name_last'])."%') OR (LOWER(c.name_parent0_last) LIKE '%".strtolower($vars['search_name_last'])."%') OR (LOWER(c.name_parent1_last) LIKE '%".strtolower($vars['search_name_last'])."%'))";
			}
			if(!empty($vars['search_address_state'])){
				$sql .= " AND (place.place_state = ".$this->db->escape($vars['search_address_state'])." OR p.address_state = ".$this->db->escape($vars['search_address_state']).")";
			}

			if(empty($vars['bypass_affiliate'])){
				if(!empty($vars['id_affiliates'])){
					if(is_array($vars['id_affiliates'])){
						$vars['id_affiliates'] = trim(implode(',', $vars['id_affiliates']), ',');
					}
					$sql .= " AND a.id_affiliate IN (".$vars['id_affiliates'].")";
				}elseif(!empty($vars['id_affiliate'])){
					$sql .= " AND a.id_affiliate =  ".$this->db->escape($vars['id_affiliate']);
				}elseif(!empty($_SESSION['affiliate']['id_affiliate']) && !$this->security_model->user_has_access(95)){
					$sql .= " AND a.id_affiliate =  ".$this->db->escape($_SESSION['affiliate']['id_affiliate']);
				}
			}
		}

		if(!empty($vars['group_by'])){
			switch(strtolower($vars['group_by'])){
				case 'family':
				case 'families':
				case 'c.id_family':
				case 'id_family':
					$sql .= " GROUP BY c.id_family";
				break;
			}
		}

		if(isset($vars['order'])){
			$sql .= " ORDER BY ".$vars['order'];
		}else{
			$sql .= " ORDER BY c.family_name";
		}
		if(isset($vars['order_dir'])){
			$sql .= " ".$vars['order_dir'];
		}else{
			$sql .= " ASC";
		}
		if(isset($vars['limit'])){
			$sql .= " LIMIT ".$vars['limit'];
		}elseif(empty($vars['no_limit'])){
			$sql .= " LIMIT 0,5000";
		}
	}//End view if

	$query = $this->db->query($sql,false);

	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>families_model->get_families: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>families_model->get_families: </strong>'.$sql.'</p>';
	}


   if($query->num_rows() > 0){

		$r = $query->result_array();

		foreach($r as $key => $val){
			$r[$key]['id_family_encoded']		= url_enc(numeric_only(str_replace(' ','',$r[$key]['id_family'])));
			$family_ids[]									= $val['id_family'];
			if(is_demo_site()){
				$r[$key]['place_name']				= '123 Any Street, Anytown, GA 30000 USA';
				$r[$key]['place_street_number']		= '123';
				$r[$key]['place_street']			= 'Any Street';
				$r[$key]['place_city']				= 'Anytown';
				$r[$key]['place_state']				= 'GA';
				$r[$key]['place_county']			= 'Anycounty';
				$r[$key]['place_zip']				= '30000';
			}
		}

		if(!empty($vars['with_assignments']) && !empty($family_ids)){
			$family_ids_flat					= implode(',',$family_ids);
			$assignments		 				= $this->get_assignments(array('family_ids' => $family_ids_flat));


			if(!empty($assignments)){
				foreach($assignments as $cur_assign){
					$cur_id_family						= $cur_assign['id_family'];
					$assigned[$cur_id_family][]			= $cur_assign;
				}
				foreach($r as $key => $val){
					$cur_id_family						= $val['id_family'];
					if(!empty( $assigned[$cur_id_family])){
						$r[$key]['assigned']				= $assigned[$cur_id_family];
					}else{
						$r[$key]['assigned']				= array();
					}
				}
			}
		}

		//correct family address
		$r[$key]			= $this->legacy_correct_family_address($r[$key]);

		if(!empty($vars['associated'])){
			foreach($r as $key => $val){
				$assoc[$val['id_family']]	= $val;
			}
			return $assoc;
		}

		return $r;

   }else{
		return null;
   }
 }

function get_family($vars=null){

	if(empty($vars['id_family']) && empty($vars['id_salesforce']) && empty($vars['id_promise'])){
		return $this->website_model->get_table_schema('ltp_families');
	}

	$result = $this->get_families($vars);

   if(!empty($result) && count($result) > 0){
	   $r = $result[0];
		return $r;
   }else{
		return false;
   }
 }

 function get_simple_family($vars){
	 $sql = "SELECT c.* FROM `ltp_families` AS c WHERE `id_family` = ".$this->db->escape($vars['id_family']);
	$query = $this->db->query($sql,false);

   if($query-> num_rows() > 0){
		$r 		= $query->result_array();
		if(!empty($r[0]['id_family'])){
			$r[0]['id_family_encoded']	= url_enc($r[0]['id_family']);
		}
	   return  	$r[0];
   }else{
		return null;
   }
 }

 function get_foster_family_members($vars=null){

	$sql = "SELECT p.*,
			a.id_role,
			r.role_name,
			a.state AS assign_state
			FROM `ltp_people` AS p
			LEFT JOIN `ltp_assignments` AS a ON p.id_people = a.id_people AND a.assignment_type = 'people_to_family' AND a.id_role < '30'
			LEFT JOIN `ltp_roles` AS r ON r.id_role = a.id_role
			WHERE a.id_family = ".$this->db->escape($vars['id_family'])."
			AND a.state > '0'
			AND p.state > '0'
			GROUP BY p.id_people";

	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY p.name_first";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$vars['order_dir'];
	}else{
		$sql .= " ASC";
	}
	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}elseif(empty($vars['no_limit'])){
		$sql .= " LIMIT 0,2000";
	}

	$query = $this->db->query($sql,false);

	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>families_model->get_foster_family_members: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>families_model->get_foster_family_members: </strong>'.$sql.'</p>';
	}

	if($query -> num_rows() > 0){
		$r = $query->result_array();
		return $r;
	}else{
		return false;
	}
}

function get_foster_parent_ids_from_assigned_list($list){
	$arr_parent_roles 	= $this->get_family_parent_roles_array();
	$arr				= array();
	if(!empty($list['assigned'])){
		foreach($list['assigned'] as $cur){
			if(in_array($cur['id_role'], $arr_parent_roles) && !empty($cur['people_email_primary'])){
				$arr[]	= $cur['id_people'];
			}
		}
	}

	return array_unique($arr);

}


function get_family_updates($vars=null){

	$sql = "SELECT u.*,
			f.family_name,
			f.name_parent0_first,
			f.name_parent0_last,
			f.name_parent1_first,
			f.name_parent1_last,
			p.name_first AS author_name_first,
			p.name_last AS author_name_last,
			p.url_avatar
			FROM `ltp_family_updates` AS u
			LEFT JOIN `ltp_families` AS f ON f.id_family = u.id_family
			LEFT JOIN `ltp_people` AS p ON p.id_people = u.id_add
			WHERE 1=1 ";

	if(!empty($vars['id_update'])){
		$sql .= " u.id_update = ".$this->db->escape($vars['id_update']);
	}

	if(!empty($vars['allow_limiters'])){

		if(!empty($vars['id_family'])){
			$sql .= " AND u.id_family = ".$this->db->escape($vars['id_family']);
		}

		if(!empty($vars['id_community'])){
			$sql .= " AND u.id_community = ".$this->db->escape($vars['id_community']);
		}
	}


	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY p.name_first";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$vars['order_dir'];
	}else{
		$sql .= " ASC";
	}
	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}elseif(empty($vars['no_limit'])){
		$sql .= " LIMIT 0,2000";
	}

	$query = $this->db->query($sql,false);

	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>families_model->get_foster_family_members: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>families_model->get_foster_family_members: </strong>'.$sql.'</p>';
	}

	if($query -> num_rows() > 0){
		$r = $query->result_array();
		return $r;
	}else{
		return false;
	}
}


 function get_family_church_id($vars=null){


	$sql = "SELECT * FROM `ltp_assignments` AS a WHERE a.state > '0' AND  a.assignment_type = 'family_to_church' AND a.id_family =  ".$this->db->escape($vars['id_family']);

	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY a.id_church";
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

	   if($query -> num_rows() > 0){
			$r 		= $query->result_array();
		   return  	$r[0]['id_church'];
	   }else{
			return null;
	   }
 }

 function find_families_in_radius($vars){
	 if(empty($vars['distance'])){
		 $vars['distance']	= 10;
	 }


	$sql = "SELECT *, 3956 * 2 * ASIN(SQRT( POWER(SIN((".$vars['people_geo_lat']."-abs(dest.family_geo_lat)) * pi()/180 / 2),2) + COS(".$vars['people_geo_lat']." * pi()/180 ) * COS( abs(dest.family_geo_lat) * pi()/180) * POWER(SIN((".$vars['people_geo_lng']." - dest.family_geo_lng) * pi()/180 / 2), 2) )) as distance FROM ltp_families dest HAVING distance < ".$vars['distance']." AND dest.id_family > 0";
	if(!empty($vars['omit_families'])){
		if(is_array($vars['omit_families']) && count($vars['omit_families']) > 0){
			$omit_ids	= implode(',',$vars['omit_families']);
			$sql .= " AND dest.id_family NOT IN (".$omit_ids.")";
		}
	}
	if(!empty($vars['updated_since'])){
		$sql .= " AND dest.date_mod > '".$vars['updated_since']."'";
	}

	$sql .= " ORDER BY distance limit 1000";
	$query = $this->db->query($sql,false);

	if($query -> num_rows() > 0){
		$r = $query->result_array();
		return $r;
	}
	return null;
}


 function run_family_page_save($data=NULL){
	$post_check 					= $this->input->post('posted');
	$db_update 						= false;
	$state							= null;
	$user							= $this->website_model->get_user_session();
	$debug							= null;
	$data['scope']					= 'family';
	$human_post						= $this->website_model->is_human_posted($data);
	$result							= array('db_update'	=> false, 'status' => false, 'id_family' => null, 'result' => 'error',  'method' => 'none', 'data' => array(), 'operations' => array());

	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}

	//Backup $data to $vars before keys are stripped
	$vars								= $data;

	//Double check for id_family
	if(empty($data['id_family']) && !empty($data['id_family_encoded'])){
		$data['id_family']			= url_dec($data['id_family_encoded']);
	}

	//Salesforce ID Check
	if(empty($data['id_family']) && !empty($data['id_salesforce'])){
		$data['id_family']		= $this->get_family_id_by_salesforce_id($data['id_salesforce']);
		if(!empty($data['id_family'])){
			$debug						.= 'Found Family ID: '.$data['id_family'].' By Matching Salesforce ID:'.$data['id_salesforce'];
		}
	}

	if(!empty($data['force_make_family_name'])){
		$data['family_name']			= $this->families_model->make_family_name($data);
	}


	if(!empty($data['agree_family_sign_name']) && empty($data['agree_family_sign_date'])){
		$data['agree_family_sign_date']	= time();
	}

	$arr_switches 						= $this->website_model->get_switches_fields('ltp_families');


	foreach($arr_switches as $chk_key){
		$prev_key						= $chk_key.'_prev';
		if(isset($data[$chk_key])){
			if(!empty($data[$chk_key])){
				$data[$chk_key]	= 1;
			}else{
				$data[$chk_key]	= 0;
			}
		}elseif(!empty($vars[$prev_key])){
			$data[$chk_key]		= 0;
		}
	}


	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_families');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}


	$data['date_mod'] 				= time();
	$data['id_mod']					= $user['id_people'];


	if(empty($data['state']) && !empty($vars['family_state'])){
		$data['state']				= 	$vars['family_state'];
	}elseif(!isset($data['state']) && empty($data['id_family'])){
		$data['state'] 				= 1;
	}

	if(empty($data['id_church_add']) && empty($data['id_family']) && !empty($_SESSION['logged_in']['id_home_church']) && !$this->security_model->user_has_access(80)){
		$data['id_church_add']	= $user['id_home_church'];
	}

	if(!empty($vars['clear_edit_key'])){
		$data['edit_key']				= '';
		$data['edit_key_date_expire'] 	= '';
	}

	//Get parent names to save on family record
	if(!empty($data['id_family']) && empty($vars['bypass_family_members'])){

		$members = $this->get_family_members($data['id_family']);
		if(!empty($members)){
			//If one parent then return them as parent zero
			if(count($members) == 1){
				$data['name_parent0_first'] 	= $members[0]['name_first'];
				$data['name_parent0_last'] 		= $members[0]['name_last'];
				$assigned[]						= $members[0]['id_people'];

				$fam_member_update					= array('id_people' => $members[0]['id_people']);
				if(!empty($data['id_place'])){
					$fam_member_update['id_place']			= $data['id_place'];
				}
				if(!empty($data['id_church_home'])){
					$fam_member_update['id_home_church']	= $data['id_church_home'];
				}

				$result['operations']['people_place_update'][]	= $this->people_model->save_family_member_info($fam_member_update);


			}else{
				$i 				= 0;
				$assigned		= array();
				$arr_male		= $this->get_parent_role_ids_male();
				$arr_female		= $this->get_parent_role_ids_female();
				$arr_generic	= $this->get_parent_role_ids_generic();
				$has_dad		= false;
				$has_mom		= false;
				$has_generic 	= false;

				foreach($members as $cur){
					if(in_array($cur['id_role'], $arr_male)){
						$has_dad = true;
					}
					if(in_array($cur['id_role'], $arr_female)){
						$has_mom = true;
					}
					if(in_array($cur['id_role'], $arr_generic)){
						$has_generic = true;
					}
				}

				foreach($members as $cur){

					//Families with dad
					if($has_dad){
						if(in_array($cur['id_role'], $arr_male) && empty($data['name_parent0_first'])){
							$data['name_parent0_first']		= $cur['name_first'];
							$data['name_parent0_last']		= $cur['name_last'];
							$assigned[]						= $cur['id_people'];
						}

						if($has_mom){
							if(in_array($cur['id_role'], $arr_female) && empty($data['name_parent1_first'])){
								$data['name_parent1_first']		= $cur['name_first'];
								$data['name_parent1_last']		= $cur['name_last'];
								$assigned[]						= $cur['id_people'];
							}
						}
					}

					//Families with mom and no dad
					if(!$has_dad && $has_mom){

						if(in_array($cur['id_role'], $arr_female) && empty($data['name_parent0_first'])){
							$data['name_parent0_first']		= $cur['name_first'];
							$data['name_parent0_last']		= $cur['name_last'];
							$assigned[]						= $cur['id_people'];
						}
					}

				}

				//Check for any potentially missed assignments
				foreach($members as $cur){
					if(!in_array($cur['id_people'], $assigned) && empty($data['name_parent'.$i.'_first'])){
						$data['name_parent'.$i.'_first']	= $cur['name_first'];
						$data['name_parent'.$i.'_last']		= $cur['name_last'];
					}
					$i++;

					$fam_member_update							= array('id_people' => $cur['id_people']);

					if(!empty($data['id_place'])){
						$fam_member_update['id_place']			= $data['id_place'];
					}
					if(!empty($data['id_church_home'])){
						$fam_member_update['id_home_church']	= $data['id_church_home'];
					}

					$result['operations']['people_place_update'][]	= $this->people_model->save_family_member_info($fam_member_update);
				}
			}

		}
	}


	//Check to update table first
	if(!empty($data['id_family'])){

		$this->db->where('id_family', $data['id_family']);
		if($this->db->update('ltp_families', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_family']			= $data['id_family'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['date_add'] 					= time();
		$data['id_add']						= $user['id_people'];


		if ($this->db->insert('ltp_families', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_family']				= $this->db->insert_id();
			$result['result']					= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['data']['id_family']			= $result['id_family'];
	$result['debug']						= $debug;



	if(!empty($result['id_family']) && empty($vars['bypass_assignments'])){

		if(empty($vars['id_affiliate'])){
			$vars['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		}

		$result['assign'] = $this->people_model->save_assignment(array('id_family' => $result['id_family'], 'id_affiliate' => $vars['id_affiliate'], 'assignment_type' => 'family_to_affiliate'));
	}


	return $result;
 }

 function save_family($data=NULL){
	$user					= $this->website_model->get_user_session();
	$post_check 			= $this->input->post('posted');
	$db_update 				= false;
	$state					= null;
	$user					= array();
	$debug					= null;
	$data['scope']			= 'family';
	$human_post				= $this->website_model->is_human_posted($data);

	if(isset($data['state'])){
		$state					= $data['state'];
	}

	if(empty($user['id_people'])){
		$user['id_people']			= 1;
	}

	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}

	//Backup $data to $vars before keys are stripped
	$vars								= $data;

	//Double check for id_family
	if(empty($data['id_family']) && !empty($data['id_family_encoded'])){
		$data['id_family']			= url_dec($data['id_family_encoded']);
	}

	//Salesforce ID Check
	if(empty($data['id_family']) && !empty($data['id_salesforce'])){
		$data['id_family']		= $this->get_family_id_by_salesforce_id($data['id_salesforce']);
		if(!empty($data['id_family'])){
			$debug						.= 'Found Family ID: '.$data['id_family'].' By Matching Salesforce ID:'.$data['id_salesforce'];
		}
	}

	if(!empty($data['force_make_family_name'])){
		$data['family_name']						= $this->families_model->make_family_name($data);
	}


	if(!empty($data['agree_family_sign_name']) && empty($data['agree_family_sign_date'])){
		$data['agree_family_sign_date']	= time();
	}

	$arr_switches 				= $this->website_model->get_switches_fields('ltp_families');
	//dds($arr_switches);

	foreach($arr_switches as $chk_key){
		$prev_key						= $chk_key.'_prev';
		if(isset($data[$chk_key])){
			if(!empty($data[$chk_key])){
				$data[$chk_key]	= 1;
			}else{
				$data[$chk_key]	= 0;
			}
		}elseif(!empty($vars[$prev_key])){
			$data[$chk_key]		= 0;
		}
	}




	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_families');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}


	//dds($data);


	//Set save modes for syncing objects
	if(!empty($vars['save_mode']) && !empty($data['id_family'])){
		$arr_protected_merge_keys		= array('id_salesforce', 'id_family');
		$cur_save_mode_obj				= $this->get_family(array('id_family' => $data['id_family'], 'show_all' => 1));

		if(!empty($cur_save_mode_obj) && empty($vars['force_local_overwrite'])){
			switch(strtolower($vars['save_mode'])){
				case 'save_newer':
				case 'newer':
				case 'update_fallback_merge':
					if(!empty($cur_save_mode_obj['date_mod']) && !empty($vars['date_src']) && $vars['date_src'] <= $cur_save_mode_obj['date_mod']){

						if(strtolower($vars['save_mode']) == 'update_fallback_merge'){
							$arr_merge_fields						= array();
							//Find fields that are missing data for a possible merge
							foreach($cur_save_mode_obj as $cur_save_mode_obj_key => $cur_save_mode_obj_val){
								if(!isset($cur_save_mode_obj_val) || (isset($cur_save_mode_obj_val) && strlen($cur_save_mode_obj_val) < 1)){
									$arr_merge_fields[]				= $cur_save_mode_obj_key;
								}
							}

							foreach($data as $data_key => $data_val){
								if(!in_array($data_key, $arr_merge_fields) && !in_array($data_key, $arr_protected_merge_keys)){
									unset($data[$data_key]);
								}
							}
							$debug	 .= 'Tried to sync, but newer record existed in database - attempting merge';
						}else{
							$result['db_update'] 			= FALSE;
							$result['status'] 					= FALSE;
							$result['id_family']				= $data['id_family'];
							$result['result']						= 'skipped';
							$result['method']					= 'none - source older';
							$result['data']						= $data;
							$result['debug']					= 'The source record is older than the record in the database. Use Save Mode: merge instead.';

							return $result;
						}
					}
				break;
				case 'save_offset':
				case 'save_merge':
				case 'offset':
				case 'merge':
					$arr_merge_fields						= array();
					//Find fields that are missing data for a possible merge
					foreach($cur_save_mode_obj as $cur_save_mode_obj_key => $cur_save_mode_obj_val){
						if(!isset($cur_save_mode_obj_val) || (isset($cur_save_mode_obj_val) && strlen($cur_save_mode_obj_val) < 1)){
							$arr_merge_fields[]				= $cur_save_mode_obj_key;
						}
					}

					foreach($data as $data_key => $data_val){
						if(!in_array($data_key, $arr_merge_fields) && !in_array($data_key, $arr_protected_merge_keys)){
							unset($data[$data_key]);
						}
					}

				break;
			}
		}
	}



	$data['date_mod'] 			= time();
	$data['id_mod']				= $user['id_people'];

	/*
	if(empty($data['family_geocode']) && !empty($data['family_address_street_1']) && !empty($data['family_address_city']) && !empty($data['family_address_state'])){
			$address						= $data['family_address_street_1'];
			if(!empty($data['family_address_street_2'])){
				$address					.= ' '.$data['family_address_street_2'];
			}
			if(!empty($data['family_address_city'])){
				$address					.= ' '.$data['family_address_city'];
			}
			if(!empty($data['family_address_state'])){
				$address					.= ' '.$data['family_address_state'];
			}
			if(!empty($data['family_address_zip'])){
				$address					.= ' '.$data['family_address_zip'];
			}
			$geocode								= $this->website_model->geocode($address);
			if(!empty($geocode['geocode'])){
				$data['family_geocode'] 	= $geocode['geocode'];
				$data['family_geo_lat']		= $geocode['lat'];
				$data['family_geo_lng']	= $geocode['lng'];
			}
		}
	*/

	if(empty($data['state']) && !empty($vars['family_state'])){
		$data['state']				= 	$vars['family_state'];
	}elseif(!isset($data['state']) && empty($data['id_family'])){
		$data['state'] 				= 1;
	}

	if(empty($data['id_church_add']) && empty($data['id_family']) && !empty($_SESSION['logged_in']['id_home_church'])){
		$data['id_church_add']	= $_SESSION['logged_in']['id_home_church'];
	}

	if(!empty($vars['clear_edit_key'])){
		$data['edit_key']				= '';
		$data['edit_key_date_expire'] 	= '';
	}

	//Check to update table first
	if(!empty($data['id_family'])){

		$this->db->where('id_family', $data['id_family']);
		if($this->db->update('ltp_families', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_family']				= $data['id_family'];
			$result['result']					= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['date_add'] 					= time();
		$data['id_add']						= $user['id_people'];


		if ($this->db->insert('ltp_families', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_family']				= $this->db->insert_id();
			$result['result']					= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['data']['id_family']			= $result['id_family'];
	$result['debug']						= $debug;
	//$this->salesforce_model->queue_salesforce_sync($data);


	//Check to sync with SF
	if($human_post && $this->salesforce_model->can_affiliate_sync() && !empty($result['id_family'])){
		if(!empty($result['data']['id_salesforce'])){
			$sf['id_salesforce']			= $result['data']['id_salesforce'];
		}

		$sf['destination']					= 'sf';
		$sf['id_promise_serves']		= $result['id_family'];
		$sf['object']							='family';
		$sf['cmd']								='post';

		$result['sf']							= $this->salesforce_model->save_salesforce_sync_queue($sf);

	}

	if(!empty($result['id_family']) && empty($vars['bypass_assignments'])){

		if(empty($vars['id_affiliate'])){
			$vars['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		}

		$result['assign'] = $this->people_model->save_assignment(array('id_family' => $result['id_family'], 'id_affiliate' => $vars['id_affiliate'], 'assignment_type' => 'family_to_affiliate'));


	}

	return $result;
 }

 function set_family_status($data=NULL){
	$user					= $this->website_model->get_user_session();
	$debug					= '';
	//$data['state']			= get_req('state');
	//$data['id_family']		= get_req_dec('id_family');
	$result					= array();

	if($this->security_model->user_has_access(60)){
		if(!empty($data['id_family']) && !empty($data['state'])){

			$data['date_mod'] 			= time();
			$data['id_mod']				= $user['id_people'];
			$this->db->where('id_family', $data['id_family']);
			if($this->db->update('ltp_families', $data)){
				$result['db_update'] 			= TRUE;
				$result['status'] 				= TRUE;
				$result['id_family']			= $data['id_family'];
				$result['result']				= 'success';
				$result['method']				= 'update';
				$result['data']					= $data;
			}
			$result['data']							= $data;
			$result['data']['id_family']			= $result['id_family'];
			$result['debug']						= $debug;
		}
	}else{
		$result['debug']			= 'User does not have access to change family state';
	}

	return $result;
 }


  function get_family_id_by_salesforce_id($vars){

	if(!is_array($vars)){
		$id_salesforce					= $vars;
		unset($vars);
		$vars['id_salesforce'] 		= $id_salesforce;
	}

	if(empty($vars['id_salesforce'])){
		return null;
	}

	$sql = "SELECT `id_family` FROM `ltp_families` AS f WHERE f.state > '0' AND (f.id_salesforce = ".$this->db->escape($vars['id_salesforce'])." OR SUBSTRING(f.id_salesforce,1,15) = ".$this->db->escape($vars['id_salesforce']).")";
	$query = $this->db->query($sql,false);


	if($query -> num_rows() > 0){
		$r = $query->result_array();
		return $r[0]['id_family'];
	}

	return null;
 }

function get_family_id_by_family_member_id($vars){
	if(!empty($vars) && !is_array($vars) && is_numeric($vars)){
		$new = $vars;
		unset($vars);
		$vars['id_people'] = $new;
		unset($new);
	}

	if(!empty($vars['id_people'])){
		$assigns = $this->get_assignments(array('id_people' => $vars['id_people'], 'assignment_type' => 'people_to_family', 'order' => 'a.date_add', 'order_dir' => 'DESC'));
		if(!empty($assigns[0]['id_family'])){
			if(!empty($vars['get_encoded'])){
				return url_enc($assigns[0]['id_family']);
			}else{
				return $assigns[0]['id_family'];
			}
		}
	}

	return null;
}

 function get_assignments($vars=null){

	 $empty[0]['id_church'] 			= null;
	 $empty[0]['id_people'] 			= null;
	 $empty[0]['id_family'] 			= null;
	 $empty[0]['id_role'] 				= null;
	 $empty[0]['role_scope'] 			= null;
	 $can_run							= false;
	 $arr_required_keys					= array('id_church', 'id_assignment', 'id_family', 'family_ids', 'people_ids', 'id_people', 'id_role', 'role_scope');

	 foreach($arr_required_keys as $cur_key){
		 if(!empty($vars[$cur_key])){
			 $can_run					= true;
		 }
	 }

	if($can_run){
		$sql = "SELECT a.*,c.*, r.*, p.*, a.state AS `assign_state` FROM `ltp_assignments` AS a
		LEFT JOIN `ltp_families` AS c ON a.id_family = c.id_family
		LEFT JOIN `ltp_people` AS p ON a.id_people = p.id_people
		LEFT JOIN `ltp_roles` AS r ON r.id_role = a.id_role
		WHERE c.`id_family` > '0'";
	}elseif(!empty($vars['return_schema'])){
		 return $empty;
	}else{
		return null;
	}

	if(!empty($vars['family_ids'])){
		$sql .= " AND a.id_family IN (".$vars['family_ids'].")";
	}
	if(!empty($vars['id_assignment'])){
		$sql .= " AND a.id_assignment =  ".$this->db->escape($vars['id_assignment']);
	}
	if(!empty($vars['assignment_type'])){
		$sql .= " AND a.assignment_type =  ".$this->db->escape($vars['assignment_type']);
	}
	if(!empty($vars['id_family'])){
		$sql .= " AND a.id_family =  ".$this->db->escape($vars['id_family']);
	}
	if(!empty($vars['id_church'])){
		$sql .= " AND a.id_church =  ".$this->db->escape($vars['id_church']);
	}
	if(!empty($vars['id_role'])){
		$sql .= " AND a.id_role =  ".$this->db->escape($vars['id_role']);
	}
	if(isset($vars['id_people'])){
		$sql .= " AND a.id_people =  ".$this->db->escape($vars['id_people']);
	}
	if(!empty($vars['role_scope'])){
		$sql .= " AND r.role_scope =  ".$this->db->escape($vars['role_scope']);
	}
	if(isset($vars['state'])){
		$sql .= " AND c.state = ".$this->db->escape($vars['state']);
	}elseif(isset($vars['assign_state'])){
		$sql .= " AND a.state = ".$this->db->escape($vars['assign_state']);
	}else{
		$sql .= " AND a.state > 0 AND c.state > 0";
	}
	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$this->db->escape($vars['order']);
	}else{
		$sql .= " ORDER BY c.family_name";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$this->db->escape($vars['order_dir']);
	}else{
		$sql .= " DESC";
	}
	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}else{
		$sql .= " LIMIT 0,2000";
	}
	//echo $sql;

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
			if(!empty($r[$key]['id_people'])){
				$r[$key]['id_people_encoded']		= url_enc($r[$key]['id_people']);
			}
		}

		return $r;

   }elseif(!empty($vars['return_schema'])){
		 return $empty;
	}else{

		return null;
	}

 }


 function get_assignment($vars=null){

	$result = $this->get_assignment($vars);


   if(count($result) > 0){
	   $r = $result[0];
     return $r;

   }else{
     return false;
   }
 }

 function get_foster_family_agency($vars){
	 if(!empty($vars) && !is_array($vars) && is_numeric($vars)){
		$new 	= $vars;
		unset($vars);
		$vars	= array('id_family' => $new);

	 }
	 $assigns 					= $this->get_assignments($vars);
	 if(!empty($assigns)){
		 foreach($assigns as $cur){
			 if(!empty($cur['assignment_type']) && $cur['assignment_type'] == 'family_to_agency' && $cur['assign_state'] > 0 && !empty($cur['id_agency'])){
				return $cur['id_agency'];
			 }
		 }
	 }

	 return null;
 }

 function get_edit_family_data($data){

	$data['return_schema']			= 1;
	$parent_count					= 0;
	$arr_parents_accounted			= array();
	$arr_kids_accounted				= array();
	$c								= $this->get_family($data);

	 if(!empty($c['id_family'])){

		$p										= $this->people_model->get_people(array('db_view' => 'foster_family_edit',
																						'id_family' => $data['id_family'],
																						'with_assignments' => 0,
																						'assignment_type' => 'people_to_family',
																						'debug' => 0,
																						'order' => 'p.name_last, p.name_first',
																						'order_dir' => 'ASC'));

	 }else{
		 $c['id_assignment']			= '';
	 }


	 $r 										= $c;
	 $schema_fields					= array(	'name_first',
																'name_last',
																'people_phone_mobile',
																'people_phone_office',
																'people_phone_home',
																'people_email_primary',
																'people_email_secondary',
																'id_people_encoded',
																'id_assignment',
																'address_street_1',
																'address_street_2',
																'address_city',
																'address_state',
																'address_zip',
																'address_country',
																'address_county',
																'address_access_instructions'
															);
	// $r['foster_mom']					= array();
	 //$r['foster_dad']					= array();

	 $r['foster_parents']				= array();
	 $r['foster_kids']					= array();
	 //$r['team_members']		= array();

	 if(empty($r['id_church'])){
		 $r['id_church']									= null;
	 }
	 if(empty($data['id_family'])){
		 $r['id_family_encoded']			= null;
	 }
	 if(empty($r['id_agency'])){
		 $r['id_agency']						= $this->get_foster_family_agency($data['id_family']);
	 }
	 if(empty($r['id_agency'])){
		 $r['id_agency']						= null;
	 }

	 $arr_address_fields					= array('address_street_1','address_street_2','address_city','address_state','address_zip','address_country','address_county', 'address_access_instructions');

	 foreach($schema_fields as $cur){
		 // $r['foster_mom'][$cur]		= null;
		 // $r['foster_dad'][$cur]			= null;
		 // $r['foster_parent'][$cur]		= null;
		  $r['foster_parents'][0][$cur]		= null;
		  $r['foster_parents'][1][$cur]		= null;

		  //$r['foster_parents'][2][$cur]		= null;
		  //$r['foster_parents'][3][$cur]		= null;
	 }

	$arr_parent_roles 	= $this->families_model->get_family_parent_roles_array();
	$arr_kid_roles 		= $this->families_model->get_family_kid_roles_array();

	 if(!empty($p)){
		 //dds($p);
		 foreach($p as $cur){

			 $cur['id_role']	= $cur['assign_id_role'];

			//correct possible missing role assignments
			if(empty($cur['assign_id_role']) && !empty($cur['role_scope_segment']) && $cur['role_scope_segment'] == 'community_family_parent'){
				$cur['assign_id_role']		= 20;
			}



			if(!empty($cur['assign_id_role']) && !in_array($cur['id_people'], $arr_parents_accounted) && in_array($cur['assign_id_role'], $arr_parent_roles)){

				$arr_parents_accounted[] 					= $cur['id_people'];
				$r['foster_parents'][$parent_count]			= $cur;
				$parent_count++;

				//Correct missing address info
				foreach( $arr_address_fields as $cur_add){
					$new_add_key			= 'family_'.$cur_add;

					if(empty($r[$new_add_key]) && !empty($cur[$cur_add])){
						$r[$new_add_key]	= $cur[$cur_add];
					}
				}
			}elseif(!empty($cur['assign_id_role']) && !in_array($cur['id_people'], $arr_parents_accounted) && in_array($cur['assign_id_role'], $arr_kid_roles)){
				$arr_parents_accounted[] 					= $cur['id_people'];
				$r['foster_kids'][]							= $cur;
			}
		 }
	 }

	$r['count_assignments_kids']			= count($r['foster_kids']);
	$r['count_assignments_parents']			= count($r['foster_parents']);


	return $r;
 }

function get_foster_parent_pronoun($vars){
	if(!is_array($vars)){
		$id_role				= $vars;
		unset($vars);
		$vars['id_role']		= $id_role;
	}

	switch($vars['id_role']){
		case -5:
			return 'caretaker';
		break;
		case 1:
			return 'biological dad';
		break;
		case 2:
			return 'biological mom';
		break;
		case 3:
			return 'biological parent';
		break;
		case 4:
			return 'sibling';
		break;
		case 5:
			return 'foster dad';
		break;
		case 6:
			return 'grandfather';
		break;
		case 7:
			return 'grandmother';
		break;
		case 8:
			return 'aunt';
		break;
		case 9:
			return 'uncle';
		break;
		case 10:
			return 'foster mom';
		break;
		case 12:
		case 13:
		case 15:
		case 14:
			return 'child';
		break;
		case 20:
			return 'parent';
		break;
	}

}

function calculate_nearby_people_distances($vars){


	if(!isset($vars['family_geo_lat']) || !isset($vars['family_geo_lng']) || empty($vars['id_family'])){
		return null;
	}


	$result								= null;
	$vars['updated_since']		= 0;
	$omit_ids							= array();
	$cur_distances 					= $this->website_model->get_distances($vars);


	if(!empty($cur_distances)){
		foreach($cur_distances as $cur_dis){
			//$vars['omit_families'][]		= $cur_dis['id_distance'];
			if($cur_dis['date_mod'] > $vars['updated_since']){
				$vars['updated_since']		= $cur_dis['date_mod'];
			}
		}
	}

	$peeps 					= $this->people_model->find_people_in_radius($vars);


	if(!empty($peeps)){
		foreach($peeps as $key => $cur){
			/*
			$cur_check['origin_lat']						= $vars['people_geo_lat'];
			$cur_check['origin_lng']					= $vars['people_geo_lng'];
			$cur_check['dest_lng']						= $cur['family_geo_lng'];
			$cur_check['dest_lat']						= $cur['family_geo_lat'];
			*/
			$vars['addresses']								= 'family';
			$cur_check['address_origin']			= $this->website_model->get_compiled_address($vars);
			$cur['addresses']								= 'people';
			$cur_check['address_dest']				= $this->website_model->get_compiled_address($cur);

			$dis														= $this->website_model->get_geocode_distance($cur_check);
			$result['dis']										= $dis;

			if(!empty($dis['distance_seconds'])){
				$cur_update									= $dis;
				$cur_update['id_family']		= $vars['id_family'];
				$cur_update['id_people']				= $cur['id_people'];

				$result['ltp_distance'][$key]				= $this->website_model->save_distance($cur_update);
			}
		}
	}


	return $result;
}

	function format_foster_parents_name($vars){
		$name = '';
		if(!empty($vars['foster_dad']['name_first'])){
			$name .= $vars['foster_dad']['name_first'];
			if(!empty($vars['foster_mom']['name_last']) && !empty($vars['foster_dad']['name_last']) && strtolower($vars['foster_mom']['name_last']) !=  strtolower($vars['foster_dad']['name_last'])){
				$name .= ' '.$vars['foster_dad']['name_last'];
			}
			if(!empty($vars['foster_mom']['name_first'])){
				$name .= ' & '.$vars['foster_mom']['name_first'].' '.$vars['foster_mom']['name_last'];
			}
		}elseif(!empty($vars['foster_mom']['name_first'])){
			$name .= $vars['foster_mom']['name_first'].' '.$vars['foster_mom']['name_last'];
		}

		return $name;
	}


	function format_family_address($vars){
		$add = '';
		if(!empty($vars['family_address_street_1'])){
			$add .= $vars['family_address_street_1'].' <br />';
		}
		if(!empty($vars['family_address_street_2'])){
			$add .= $vars['family_address_street_2'].' <br />';
		}
		if(!empty($vars['family_address_city'])){

			$add .= $vars['family_address_city'].', ';
		}
		if(!empty($vars['family_address_state'])){
			if(strlen($vars['family_address_state']) == 2){
				$add .= strtoupper($vars['family_address_state']).' ';
			}else{
				$add .= $vars['family_address_state'].' ';
			}

		}
		if(!empty($vars['family_address_zip'])){
			$add .= $vars['family_address_zip'];
		}

		return $add;
	}


	function format_foster_parents_phones($vars){
		$name = '';
		if(!empty($vars['foster_dad']['people_phone_mobile'])){
			$name .= $vars['foster_dad']['name_first'].': '.$vars['foster_dad']['people_phone_mobile'].' ';

		}
		if(!empty($vars['foster_mom']['people_phone_mobile'])){
			$name .= $vars['foster_mom']['name_first'].': '.$vars['foster_mom']['people_phone_mobile'];
		}

		return $name;
	}

	function format_meal_date($vars){
		$name = '';

		if(!empty($vars['assigned'][0]['meal_week']) && !empty($vars['assigned'][0]['meal_day'])){
			$name = 'Meal Date: '.ordinal($vars['assigned'][0]['meal_week']).'  ';
			switch($vars['assigned'][0]['meal_day']){
				case 1:
					$name .= 'Sunday';
				break;
				case 2:
					$name .= 'Monday';
				break;
				case 3:
					$name .= 'Tuesday';
				break;
				case 4:
					$name .= 'Wednesday';
				break;
				case 5:
					$name .= 'Thursday';
				break;
				case 6:
					$name .= 'Friday';
				break;
				case 7:
					$name .= 'Saturday';
				break;
			}
		}
		return $name;
	}

	 function get_family_status_from_state($list){
		$status 	= '';

		if(isset($list['family_state'])){
			$list['state']				= $list['family_state'];
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
				$status				= 'Prospect';
			 break;
			 case '12':
				$status				= 'Applicant - Awaiting class';
			 break;
			 case '13':
				$status				= 'Applicant - In class';
			 break;
			 case '14':
				$status				= 'Applicant - Completed class / homestudy in progress';
			 break;
			 case '15':
				$status				= 'Applicant - Awaiting licensure';
			 break;
			 case '22':
				$status				= 'On Hold';
			 break;
			 case '24':
				$status				= 'Closed';
			 break;
			case '25':
				$status				= 'Applicant';
			 break;
			 case '30':
				$status				= 'Care Requested / Needs Vetting';
			 break;
			case '32':
				$status				= 'Awaiting Placement';
			 break;
			 case '35':
				$status				= 'Respite';
			 break;
			case '40':
				$status				= 'Active - No care community desired';
			 break;
			 case '42':
				$status				= 'Active - Awaiting community';
			 break;
			 case '44':
				$status				= 'Active - Building community';
			 break;
			 case '46':
				$status				= 'Active - Being served';
			 break;
		 }

		 return $status;
	}


	function update_family_status($vars){
		$user['id_people'] = 1;

		if(!empty($_SESSION['logged_in'])){
			$user	= $_SESSION['logged_in'];
		}

		if(!empty($vars['state']) && !empty($vars['id_family'])){
			$sql = "UPDATE `ltp_families` SET `state` = ".$this->db->escape($vars['state'])." WHERE `id_family` = ".$this->db->escape($vars['id_family'])." AND `date_mod` = '".time()."' AND `id_mod` = '".$user['id_people']."'";

			$query = $this->db->query($sql,false);


			return $query;
		}


	}

	function get_avatar_filename($vars){
		$cur_avatar			= null;
		$cur				= $vars;
		$html				= '';

		if(empty($cur['id_family'])){
			$cur['id_family']	= 0;
		}
		if(!empty($cur['url_avatar_one_pager'])){
			$cur_avatar = $cur['url_avatar_one_pager'];
		}elseif(!empty($cur['url_avatar'])){
			$cur_avatar = $cur['url_avatar'];
		}

		return correct_img_path($cur_avatar);
	}

	function make_family_avatar($vars){
		$vars['avatar_code_only']	= 1;
		return $this->display_family_avatar($vars);
	}

	function get_family_avatar($vars){
		$vars['avatar_code_only']	= 1;
		return $this->display_family_avatar($vars);
	}

	function display_family_avatar($vars){
		$list = $vars;
		$html				= '';

		if(empty($list['cur_com_arr']) && !empty($list['family_name'])){
			$list['cur_com_arr']		= explode(' ',$list['family_name']);
			 if(empty($list['cur_com_arr'][1])){
				 $list['cur_com_arr'][1] = '';
			 }
		}


		if(empty($list['url_avatar']) && !empty($list['author_url_avatar'])){
			$list['url_avatar'] = $list['author_url_avatar'];
		}
		if(!empty($list['url_avatar'])){
			$html .=  '<div class="avatar-circle center-block dropdown-toggle" data-toggle="dropdown">';
			$html .=  '<img src="'.correct_img_path($list['url_avatar']).'" class="img-responsive" alt="" width="50" 	height="50">';
			//echo ' <br /><span class="caret"></span>';
			$html .=  '</div>';
		}elseif(!empty($list['family_name'])){
			$html .=  '<div class="avatar-circle center-block dropdown-toggle" data-toggle="dropdown">';
			$html .=  '<span class="initials">'.strtoupper(substr($list['family_name'],0,1)).'</span>';
			//echo ' <br /><span class="caret"></span>';
			$html .=  '</div>';
		}elseif(!empty($list['cur_com_arr'][0]) && !empty($list['cur_com_arr'][1])){
			$html .=  '<div class="avatar-circle center-block dropdown-toggle" data-toggle="dropdown">';
			$html .=  '<span class="initials">'.strtoupper(substr($list['cur_com_arr'][0],0,1).substr($list['cur_com_arr'][1],0,1)).'</span>';
			//echo ' <br /><span class="caret"></span>';
			$html .=  '</div>';
		}elseif(!empty($list['cur_com_arr'][0])){
			$html .= '<div class="avatar-circle center-block dropdown-toggle" data-toggle="dropdown">';
			$html .= '<span class="initials">'.strtoupper(substr($list['cur_com_arr'][0],0,1)).'</span>';
			//echo ' <br /><span class="caret"></span>';
			$html .= '</div>';
		}

		if(!empty($vars['avatar_code_only'])){
			return $html;
		}else{
			echo $html;
		}
	}

	function make_family_list_actions_button($vars){
		$comm_name				= '';
		$can_edit					= false;
		$r 								= '';
		if($this->security_model->can_admin_family($vars)){
			$can_edit			= true;
		}
		if($can_edit){
			$cur_link 				= base_url().'family/edit/'.$vars['id_family_encoded'];
		}else{
			$cur_link 				= '#';
		}


		$status						= $this->families_model->get_family_status_from_state($vars);
		if(empty($vars['people_email'])){
			$vars['people_email']	= '';
		}

		if(empty($vars['id_salesforce'])){
			$vars['id_salesforce']	= '';
		}

		$msg_json					= null;

		unset($msg_json_agree);
		if(empty($vars['vol_agree_sign_name']) && !empty($vars['people_email_primary'])){
			$msg_json_agree['body']							=  $this->emails_model->get_email_request_volunteer_signature($vars);
			$msg_json_agree['subject']						= 'Action Needed: Care Community Volunteer Agreement';
			$msg_json_agree['recipient_ids']				= array($vars['id_people']);
			$msg_json_agree									= json_encode($msg_json_agree);
		}

		if(!empty($_SESSION['view_limiter']['id_role']) && $_SESSION['view_limiter']['id_role'] == 310){
			$comm 		= $this->communities_model->get_active_care_community_for_volunteer($list);
			$status 	.= '<br /><small>'.$comm['community_name'].'</small>';
		}


		 $msg_json_agree	= array();
		 $msg_json_data		= array('id_email_layout' => null);
		 $id_parents		= $this->families_model->get_foster_parent_ids_from_assigned_list($vars);
		 $community			= $this->communities_model->get_active_care_community_for_family(array('id_family' => $vars['id_family']));
		 if(empty($list['vol_agree_sign_name']) && !empty($id_parents[0])){
			$msg											=  $this->emails_model->get_email_request_family_signature($vars);
			if(is_array($msg)){

				if(!empty($msg['messaging_body'])){
					$msg_json_agree['body']						= $msg['messaging_body'];
				}
				if(!empty($msg['id_email_layout'])){
					$msg_json_data['id_email_layout']			= $msg['id_email_layout'];
				}
				if(!empty($msg['email_layout_header'])){
					$msg_json_data['email_layout_header']		= $msg['email_layout_header'];
				}
			}else{
				$msg_json_agree['body']							= $msg;

			}

			$msg_json_agree['subject']							= 'Action Needed: Supported Family Agreement';
			$msg_json_agree['recipient_ids']					= $id_parents;

			$msg_json_agree										= json_encode($msg_json_agree);
			$msg_json_data										= json_encode($msg_json_data);
		 }

		if($this->security_model->user_has_access(99)){
			$r .= '<p class="text-center id-number">'. $vars['id_family'].'</p>';
		}
		$r .= '<div class="dropdown" style="float:none;">
			<button class="btn btn-default dropdown-toggle btn-block" role="button" data-toggle="dropdown">
				<span class="caret"></span> Actions
			</button>
			<ul class="dropdown-menu">';
				if($can_edit){

					$r .= '<li><a href="'.$cur_link.'" class="ps_link_load_ui">Edit</a></li>';
					//$r .= '<li><a href="'.base_url().'communities/list/?search='.rawurlencode(str_replace(' and ', ' ',str_replace('&', ' ',$this->website_model->display_format_family_name($vars)))).'">View Care Communities</a></li>';

					if(!empty($vars['agree_family_sign_name'])){
						$r .= '<li><a href="'.base_url().'form/familyagreement/'.url_enc($vars['id_family']).'/?show_print=1" target="_blank">View / Print Agreement</a></li>';
					}elseif(!empty($id_parents[0])){
						$r .= "<li><a href='#bannerformmodal' data-toggle='modal' data-target='#composemessagemodal' class='btn-msg-trigger' data-rids='".$vars['id_family']."' data-msgjson='".$msg_json_agree."' data-datajson='".$msg_json_data."'>Request Agreement Signature</a></li>";
					}

					if(!empty($id_parents[0]) && 1==2){
						$r .= '<li><a href="#composemessagemodal" data-toggle="modal" data-target="#composemessagemodal" class="btn-msg-trigger" data-rids="'.implode(',',$id_parents).'" data-msgslug="email_family_foster_request_update_info" data-msgscope="family_members">Request Info Update</a></li>';
					}

					if(!empty($this->website_model->get_compiled_address($vars))){
						$r .= '<li><a href="'.base_url().'volunteer-quick-check?address='.urlencode($this->website_model->get_compiled_address($vars)).'">View Potential Volunteers</a></li>';
					}

					if(!empty($community['id_community'])){
						$r .= '<li><a href="'.base_url().'community/edit/'.url_enc($community['id_community']).'">Edit Care Community</a></li>';
					}else{
						$r .= '<li><a href="'.base_url().'community/add/?f='.url_enc($vars['id_family']).'&r='.url_enc(base_url().'families/list').'&cancel='.url_enc(base_url().'families/list').'">Create Care Community</a></li>';
					}

					if($this->security_model->user_has_access(60)){
						$r .= '<li><a href="#" data-href="'.base_url().'family/delete?i='.$vars['id_family_encoded'].'" data-toggle="modal" data-target="#confirm-delete">Delete</a></li>';
					}

				}else{
					$r .= '	<li><a href="">No Access</a></li>';
				}//end of Can /Edit

		$r .= '</ul>
		</div>';

	return $r;
}

 function get_family_name($vars){
     $vars = format_array_vals($vars, 'id_family');

	 if(empty($vars['family_name']) && empty($vars['id_family'])){
		 return null;
	 }

	 if(empty($vars['family_name'])){
	     $fam = $this->get_family(array('id_family' => $vars['id_family']));
		 if(!empty($fam)){
			 $vars = array_merge($vars, $fam);
		 }
	 }

	 $cur_name 		= '';
	 $name_last 	= '';
	 $name_arr		= explode(',',$vars['family_name']);

	 if(!empty($name_arr[0]) && !empty($name[1])){
		$name_last 		= $this->website_model->display_format_people_name_last(array('name_last' => $name_arr[0]));
		$cur_name 		= $name_last.', '.$name_arr[1];
	 }else{
		 $name_arr		= explode(' ',$vars['family_name']);
		 $name_last		= $this->website_model->display_format_people_name_last(array('name_last' => end($name_arr)));
		 for($i=0; $i < count($name_arr) - 1; $i++){
			 $cur_name	.= $name_arr[$i].' ';
		 }
		 $cur_name		.= $name_last;
	 }


	if(!empty($vars['use_family_suffix'])){
		$cur_name = str_ireplace(' family', '', $cur_name);
		$cur_name .= ' Family';
	}

	return $cur_name;
 }

 function get_foster_parent_types_array(){
	 return array('foster_mom', 'foster_dad', 'foster_parent', 'foster_parent_1', 'foster_parent_2', 'foster_parent_3', 'foster_parent_4');
 }

function make_family_name($vars){
	$parents				= array();
	$name					= null;
	$name_last			= null;
	$has_mom			= false;
	$has_dad				= false;
	$has_kid				= false;
	$parent_count			= 0;
	$matching_last_name		= false;
	$arr_roles_dad			= $this->get_parent_role_ids_male();
	$arr_roles_mom			= $this->get_parent_role_ids_female();

	for($i=0; $i < 4; $i++){
		if(empty($vars['foster_parent_'.$i.'_name_first']) && !empty($vars['name_parent'.$i.'_first'])){
			$vars['foster_parent_'.$i.'_name_first'] = $vars['name_parent'.$i.'_first'];
		}

		if(empty($vars['foster_parent_'.$i.'_name_last']) && !empty($vars['name_parent'.$i.'_last'])){
			$vars['foster_parent_'.$i.'_name_last'] = $vars['name_parent'.$i.'_last'];
		}

		if(empty($vars['foster_parent_'.$i.'_id_role']) && !empty($vars['parent'.$i.'_id_role'])){
			$vars['foster_parent_'.$i.'_id_role'] = $vars['parent'.$i.'_id_role'];
		}


		if(empty($vars['foster_mom_name_first']) && !empty($vars['foster_parent_'.$i.'_name_first']) && in_array($vars['foster_parent_'.$i.'_id_role'], $arr_roles_mom)){
			$vars['foster_mom_name_first'] 	= $vars['foster_parent_'.$i.'_name_first'];
			$vars['foster_mom_name_last']	= $vars['foster_parent_'.$i.'_name_last'];
			$has_mom									= true;
			$parent_count++;
		}
		if(empty($vars['foster_dad_name_first']) && !empty($vars['foster_parent_'.$i.'_name_first']) && in_array($vars['foster_parent_'.$i.'_id_role'], $arr_roles_dad)){
			$vars['foster_dad_name_first'] 	= $vars['foster_parent_'.$i.'_name_first'];
			$vars['foster_dad_name_last']		= $vars['foster_parent_'.$i.'_name_last'];
			$has_dad									= true;
			$parent_count++;
		}
	}


	for($i=0; $i < 4; $i++){
		if(empty($vars['foster_mom_name_first']) && !empty($vars['foster_parent_'.$i.'_name_first']) && $vars['foster_parent_'.$i.'_id_role'] == 20){
			$vars['foster_mom_name_first'] 	= $vars['foster_parent_'.$i.'_name_first'];
			$vars['foster_mom_name_last']	= $vars['foster_parent_'.$i.'_name_last'];
			$has_mom									= true;
			$parent_count++;
		}elseif(empty($vars['foster_dad_name_first']) && !empty($vars['foster_parent_'.$i.'_name_first']) && $vars['foster_parent_'.$i.'_id_role'] == 20){
			$vars['foster_dad_name_first'] 	= $vars['foster_parent_'.$i.'_name_first'];
			$vars['foster_dad_name_last']	= $vars['foster_parent_'.$i.'_name_last'];
			$has_dad									= true;
			$parent_count++;
		}
	}




	if(!empty($vars['foster_mom_name_last']) && !empty($vars['foster_dad_name_last']) && alpha_only($vars['foster_mom_name_last']) == alpha_only($vars['foster_dad_name_last'])){
		$name_last 			= $vars['foster_mom_name_last'];
		$parents				= array('mom', 'dad');
		$matching_last_name		= true;
	}elseif(!empty($vars['foster_mom_name_last'])){
		$name_last 	 		= $vars['foster_mom_name_last'];
		$parents				= array('mom');
	}elseif(!empty($vars['foster_dad_name_last'])){
		$name_last 			= $vars['foster_dad_name_last'];
		$parents				= array('dad');
	}


	if($parent_count > 1 && $matching_last_name){
		$name .= $vars['foster_dad_name_first'].' and '.$vars['foster_mom_name_first'].' '.$name_last;
	}elseif($parent_count > 1 && !$matching_last_name){
		$name .= $vars['foster_dad_name_first'].' '.$vars['foster_dad_name_last'].' and '.$vars['foster_mom_name_first'].' '.$vars['foster_mom_name_last'];
	}elseif(in_array('mom', $parents) && !empty($vars['foster_mom_name_last'])){
		$name 	.= $vars['foster_mom_name_first'].' '.$name_last;
	}elseif(in_array('dad', $parents) && !empty($vars['foster_dad_name_last'])){
		$name .= $vars['foster_dad_name_first'].' '.$name_last;
	}



	 return $name;
 }

 function attempt_lookup($vars){
	$r['status']		= 0;
	$r['reposnse']		= 'No Match';
	$r['id_family']		= '';
	$r['accuracy']		= 0;
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $_SESSION['affiliate']['id_affiliate'];
	}
	$name_variations	= array('' => '', 'family' => '', ' and ' => ' & ', '&', ' and ');


	//Look for Promise Serves ID
	if(!empty($vars['id_family'])){
		$r = array('status' => 1, 'response' => 'Match', 'id_family' => $vars['id_family'], 'accuracy' => 100);
	}

	//Try harder lookups
	if($r['status']	< 1){
		if(!empty($vars['bypass_affiliate'])){
			$families		= $this->get_families(array('order' => 'date_add', 'order_dir' => 'DESC'));
		}else{
			$families		= $this->get_families(array('order' => 'date_add', 'order_dir' => 'DESC', 'id_affiliate' => $vars['id_affiliate']));
		}
	}

	//Look for Affiliate Internal ID
	if($r['status']	< 1 && !empty($vars['id_org_internal'])){
		foreach($families as $cur){
			if(!empty($cur['id_org_internal']) && hash_challenge($cur['id_org_internal']) == hash_challenge($vars['id_org_internal'])){
				$r = array('status' => 1, 'response' => 'Match', 'id_family' => $cur['id_family'], 'accuracy' => 100);
			}
		}
	}

	//Look for Salesforce ID

	//Match on name and zip
	if($r['status']	< 1 && !empty($vars['family_name']) && !empty($vars['address_zip'])){
		$check_count		= 0;
		$r_alts				= array();

		foreach($families as $cur){
			foreach($name_variations AS $name_key => $name_val){

				if(!empty($vars['address_zip'])){
					$vars['test_family_name']		= hash_challenge(str_replace($name_key, $name_val, $vars['family_name']));
					$cur['test_family_name']		= hash_challenge(str_replace($name_key, $name_val, $cur['family_name']));

					if($cur['test_family_name'] == $vars['test_family_name'] && hash_challenge($vars['address_zip']) == hash_challenge($vars['address_zip'])){
						$cur_id_family				= $cur['id_family'];
						$r 							= array('status' => 1, 'response' => 'Match', 'id_family' => $cur['id_family'], 'accuracy' => 100, 'match_on' => 'name_and_zip');
						$r_alts[]					= $cur['id_family'];
						$r_alt_data[$cur_id_family]	= $cur;
						$check_count++;
					}
				}
			}
			if($check_count > 1){
				$r['id_matches']	= array_unique($r_alts);
				$r['match_data']	= $r_alt_data;
				$check_count		= count($r['id_matches']);
				$r['accuracy']		= floor(100 / $check_count);
			}
			if($check_count > 0){
				$r['status']	= 1;
			}
		}
	}

	//Match on name, city & state
	if($r['status']	< 1 && !empty($vars['family_name']) && !empty($vars['address_city']) && !empty($vars['address_state'])){
		$check_count		= 0;
		$r_alts				= array();

		foreach($families as $cur){
			foreach($name_variations AS $name_key => $name_val){
				$vars['test_family_name']		= hash_challenge(str_replace($name_key, $name_val, $vars['family_name']));
				$cur['test_family_name']		= hash_challenge(str_replace($name_key, $name_val, $cur['family_name']));
				if($cur['test_family_name'] == $vars['test_family_name'] && hash_challenge($cur['address_city']) == hash_challenge($vars['address_city']) && hash_challenge(name_to_abbr($cur['address_state'])) == hash_challenge(name_to_abbr($vars['address_state']))){
					$cur_id_family				= $cur['id_family'];
					$r 							= array('status' => 1, 'response' => 'Match', 'id_family' => $cur['id_family'], 'accuracy' => 100, 'match_on' => 'name_and_state');
					$r_alts[]					= $cur['id_family'];
					$r_alt_data[$cur_id_family]	= $cur;
					$check_count++;
				}
			}
			if($check_count > 1){
				$r['id_matches']	= array_unique($r_alts);
				$r['match_data']	= $r_alt_data;
				$check_count		= count($r['id_matches']);
				$r['accuracy']		= floor(100 / $check_count);
			}
			if($check_count > 0){
				$r['status']	= 1;
			}
		}
	}

	//Match on email
	if($r['status']	< 1 && !empty($vars['family_contact_email'])){
		$check_count		= 0;
		$r_alts				= array();
		foreach($families as $cur){
			if(!empty($cur['family_contact_email']) && hash_challenge($cur['family_contact_email']) == hash_challenge($vars['family_contact_email'])){
				$cur_id_family				= $cur['id_family'];
				$r 							= array('status' => 1, 'response' => 'Match', 'id_family' => $cur['id_family'], 'accuracy' => 100, 'match_on' => 'family_contact_email');
				$r_alts[]					= $cur['id_family'];
				$r_alt_data[$cur_id_family]	= $cur;
				$check_count++;
			}
			if($check_count > 1){
				$r['id_matches']	= array_unique($r_alts);
				$r['match_data']	= $r_alt_data;
				$check_count		= count($r['id_matches']);
				$r['accuracy']		= floor(100 / $check_count);

			}
			if($check_count > 0){
				$r['status']	= 1;
			}
		}
	}

	//Match on phone
	if($r['status']	< 1 && !empty($vars['family_phone'])){
		$check_count		= 0;
		$r_alts				= array();
		foreach($families as $cur){
			if(!empty($cur['family_phone']) && hash_challenge($cur['family_phone']) == hash_challenge($vars['family_phone'])){
				$cur_id_family				= $cur['id_family'];
				$r 							= array('status' => 1, 'response' => 'Match', 'id_family' => $cur['id_family'], 'accuracy' => 100, 'match_on' => 'phone');
				$r_alts[]					= $cur['id_family'];
				$r_alt_data[$cur_id_family]	= $cur;
				$check_count++;
			}
			if($check_count > 1){
				$r['id_matches']	= array_unique($r_alts);
				$r['match_data']	= $r_alt_data;
				$check_count		= count($r['id_matches']);
				$r['accuracy']		= floor(100 / $check_count);
			}
			if($check_count > 0){
				$r['status']	= 1;
			}
		}
	}

	//Match on name
	if($r['status']	< 1 && !empty($vars['family_name'])){
		$check_count		= 0;
		$r_alts				= array();

		foreach($families as $cur){
			foreach($name_variations AS $name_key => $name_val){
				$vars['test_family_name']		= hash_challenge(str_replace($name_key, $name_val, $vars['family_name']));
				$cur['test_family_name']		= hash_challenge(str_replace($name_key, $name_val, $cur['family_name']));
				//echo '<br />'.$cur['test_family_name'].' '.$vars['test_family_name'];
				if($cur['test_family_name'] == $vars['test_family_name']){
					$cur_id_family				= $cur['id_family'];
					$r 							= array('status' => 1, 'response' => 'Match', 'id_family' => $cur['id_family'], 'accuracy' => 100, 'match_on' => 'name_only');
					$r_alts[]					= $cur['id_family'];
					$r_alt_data[$cur_id_family]	= $cur;
					$check_count++;
				}
			}
			if($check_count > 1){
				$r['id_matches']	= array_unique($r_alts);
				$r['match_data']	= $r_alt_data;
				$check_count		= count($r['id_matches']);
				$r['accuracy']		= floor(100 / $check_count);
			}
			if($check_count > 0){
				$r['status']	= 1;
			}
		}
	}


	return $r;
 }

 function get_status_value_from_import($vars){

	 $arr_import_status		= array('exist', 'exist_then_active', 'exist_then_csv', 'exist_then_prospect');

	if(!empty($vars['import_overwrite_status']) && in_array($vars['import_overwrite_status'],$arr_import_status)){
		if(isset($vars['db_cur']['family_state'])){
			return $vars['db_cur']['family_state'];
		}else{
			switch(strtolower($vars['import_overwrite_status'])){
				case 'exist_then_active':
					return 40;
				break;
				case 'exist_then_prospect':
					return 10;
				break;
				case 'exist':
					return 1;
				break;
			}
		}
	}


	 if(!isset($vars['state'])){
		 return null;
	 }

	if(isset($vars['state']) && is_numeric($vars['state'])){
		return $vars['state'];
	}

	if(isset($vars['status']) && is_numeric($vars['status'])){
		return $vars['status'];
	}elseif(isset($vars['status'])){
		$vars['state']	= $vars['status'];
	}

	if(isset($vars['family_state']) && is_numeric($vars['family_state'])){
		return $vars['family_state'];
	}elseif(isset($vars['family_state'])){
		$vars['state']	= $vars['family_state'];
	}

	if(empty($vars['state']) && !empty($vars['status_foster'])){
		if(is_numeric($vars['status_foster'])){
			return $vars['status_foster'];
		}else{
			$vars['state']		= $vars['status_foster'];
		}
	}

	//array('' => 'Select a status', 5 => 'Unknown', 10 => 'Prospect', 30 => 'Open', 25 => 'Applicant', 30 => 'Needs Vetting', 40 => 'Active Placement', 42 => 'Active / Awaiting Community', 46 => 'Active / Being Served', 35=> 'Respite', 22=> 'On Hold', 24 => 'Closed' );

	switch(hash_challenge($vars['state'])){
		case 'prospect':
		case 'prospective':
		case 'potential':
		case 'considering':
		case 10:
			$vars['state']		= 10;
		break;
		case 'applicant':
		case 'applied':
		case 'application':
		case 25:
			$vars['state']		= 25;
		break;
		case 'needsvetting':
		case 30:
			$vars['state']		= 25;
		break;
		case 'active':
		case 'activeplacement':
		case 'actively':
		case 'actived':
		case 'running':
		case 'current':
		case 'currently':
		case 'present':

		case 'yes':
		case 'y':
		case 'x':
		case 'open':
		case 40:
			$vars['state']		= 40;
		break;
		case 'activeawaitingcc':
		case 'activeawaitingcommunity':
		case 'inneedofcc':
		case 'inneedofcarecommunity':
		case 'waitingforcc':
		case 'waitingforcarecommunity':
		case 42:
			$vars['state']		= 42;
		break;
		case 'activebeingserved':
		case 'activelybeingserved':
		case 'beingserved':
		case 'served':
		case 'serving':
		case 'fostering':
		case 'adopted':
		case 46:
			$vars['state']		= 46;
		break;
		case 'inactive':
		case 'disabled':
		case 'notrunning':
		case 'notactive':
		case 'notcurrent':
		case 'no':
		case 'not':
		case 'n':
		case 'closed':
			$vars['state']		= 24;
		break;
		case 'onhold':
		case 'waiting':
		case 'paused':
		case 'pause':
		case 'hold':
			$vars['state']		= 22;
		break;
	}

	return $vars['state'];
}

function get_adoption_status_value_from_import($vars){

	if(empty($vars['status_adoption'])){
		return null;
	}

	switch(hash_challenge($vars['status_adoption'])){
		case 'neveradopted':
		case 'no':
		case 'n':
		case 1:
			$vars['status_adoption']		= 1;
		break;
		case 'desiretoadopt':
		case 'prospect':
		case 'prospective':
		case 'considering':
		case 'open':
		case 2:
			$vars['status_adoption']		= 2;
		break;
		case 'inadoptionprocess':
		case 'inprocess':
		case 'waiting':
		case 'processing':
		case 'underway':
		case 'hold':
		case 3:
			$vars['status_adoption']		= 3;
		break;
		case 'haveadopted':
		case 'hasadopted':
		case 'adopted':
		case 'yes':
		case 'y':
		case 4:
			$vars['status_adoption']		= 4;
		break;
	}

	return $vars['status_adoption'];
}

function get_family_type_values_from_import($vars){

	if(empty($vars['family_type'])){
		return $vars;
	}

	switch(hash_challenge($vars['family_type'])){
		case 'adopted':
			$vars['has_past_adopted']		= 1;
			$vars['status_adoption']		= 4;
		break;
		case 'kinship':
			$vars['has_past_kinship_placement']	= 1;
			if(!empty($cur['status_foster']) && $cur['status_foster'] == 40){
				$vars['has_current_kinship_placement']		= 1;
			}
		break;
		case 'foster':
		case 'fostertoadopt':
			$vars['has_past_fostered']		= 1;
			if(!empty($cur['status_foster']) && $cur['status_foster'] == 40){
				$vars['has_current_foster_placement']		= 1;
			}
		break;
		case 'both':
			$vars['has_past_adopted']		= 1;
			$vars['status_adoption']		= 4;
			if(!empty($cur['status_foster']) && $cur['status_foster'] == 40){
				$vars['has_current_foster_placement']		= 1;
			}
		break;
	}

	return $vars;
}

function get_foster_status_value_from_import($vars){

	if(empty($vars['status_foster'])){
		return null;
	}

	switch(hash_challenge($vars['status_foster'])){
		case 'currentlyfostering':
		case 'fostering':
		case 'active':
		case 'actively':
		case 'actived':
		case 'running':
		case 'current':
		case 'currently':
		case 'present':
		case 'yes':
		case 'y':
		case 'x':
		case 'open':
			$vars['status_foster']		= 40;
		break;
		case 'applicant':
		case 'applied':
			$vars['status_foster']		= 10;
		break;
		case 'onhold':
		case 'waiting':
		case 'paused':
		case 'pause':
		case 'hold':
			$vars['status_foster']		= 22;
		break;
	}

	return $vars['status_foster'];
}
function get_foster_family_kid_role_from_import($vars){

	if(!is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars['role']	= $new;
	}

	if(empty($vars['role'])){
		return null;
	}

	switch(hash_challenge($vars['role'])){
		case 'adopted':
		case 'adoptedchild':
		case 'adoptedkid':
		case 'adoptingchild':
		case 'adopting':
		case 'adoptedkid':
		case 'finalized':
		case 'finalizedkid':
		case 'finalizedchild':
		case 12:
			$vars['role']		= 12;
		break;
		case 'biological':
		case 'biologicalkid':
		case 'biologicalchild':
		case 'bio':
		case 'biokid':
		case 'biochild':
		case 13:
			$vars['role']		= 13;
		break;
		case 'foster':
		case 'fostering':
		case 'fostertoadopt':
		case 'fosteringtoadopt':
		case 'fostertoadoption':
		case 'fostertoadopting':
		case 'fosteradopting':
		case 'fosteradopt':
			$vars['status_foster']		= 14;
		break;
	}

	return $vars['role'];
}

function get_foster_family_people_from_import($vars){

	if(!empty($vars['family_name'])){
		$vars['family_name']	= preg_replace('!\s+!', ' ', $vars['family_name']);
	}
	$add_peep				= array();


	//Check for individual parents listed
	$has_individual_names	= false;
	for($q=0; $q < 4; $q++){
		if(!empty($vars['name_foster_parent_full_'.$q])){
			$name_parts								= explode(' ', $vars['name_foster_parent_full_'.$q]);
			$add_peep[$q]['name_last']				= end($name_parts);
			$add_peep[$q]['name_first']				= '';
			$add_peep[$q]['parent_role'] 			= 'parent';
			$add_peep[$q]['id_role'] 				= 20;
			$add_peep[$q]['parent_role_position'] 	= 'parent_'.$q;
			foreach($name_parts as $cur_part){
				if($cur_part != $add_peep[$q]['name_last']){
					$add_peep[$q]['name_first']	.= $cur_part;
				}
			}
			$has_individual_names			= true;
		}
	}

	//Check for individual kids listed
	for($q=0; $q < 10; $q++){
		if(!empty($vars['name_foster_kid_full_'.$q])){
			$i 										= $q + 4;
			$name_parts								= explode(' ', $vars['name_foster_kid_full_'.$q]);
			$add_peep[$i]['name_last']				= end($name_parts);
			$add_peep[$i]['name_first']				= '';
			$add_peep[$i]['parent_role'] 			= 'kid';
			$add_peep[$i]['id_role'] 				= 15;
			$add_peep[$i]['parent_role_position'] 	= 'kid_'.$q;
			foreach($name_parts as $cur_part){
				if($cur_part != $add_peep[$i]['name_last']){
					$add_peep[$i]['name_first']	.= $cur_part;
				}
			}


			//Other Foster Kid Fields
			if(!empty($vars['dob_foster_kid_'.$q])){
				$add_peep[$i]['people_dob']		= strtotime($vars['dob_foster_kid_'.$q]);
			}
			if(!empty($vars['role_foster_kid_'.$q])){
				$add_peep[$i]['id_role']		= $this->get_foster_family_kid_role_from_import($vars['role_foster_kid_'.$q]);
			}

		}
	}


	if(!$has_individual_names){

		//try to create people based on family name
		if(strpos($vars['family_name'],'&') !== false){
			$fam_parts = explode('&', $vars['family_name']);
		}elseif(stripos($vars['family_name'],' and ') !== false){
			$fam_parts = preg_split("/ and /i", $vars['family_name']);
		}else{
			$fam_parts = explode(' ', $vars['family_name']);
		}


		if(!empty($fam_parts[0])){
			//Clean up input of names first
			foreach($fam_parts as $key => $val){
				$fam_parts[$key]		= trim($val);
			}

			//Check first for names where couples do not have the same last name formatted like: John Doe & Jane Foe
			$unmatched_check[] 	= explode(' ', $fam_parts[0]);
			$unmatched_check[] 	= explode(' ', $fam_parts[1]);

			if(count($unmatched_check[1]) + count($unmatched_check[0]) > 3){
				if(!empty($unmatched_check[0][1]) && !empty($unmatched_check[1][1])){
					if(strtolower(end($unmatched_check[0])) != strtolower(end($unmatched_check[1]))){
						for($q=0; $q < 2; $q++){
							$add_peep[$q]['name_first']		= null;
							$add_peep[$q]['name_last']		= end($unmatched_check[$q]);
							for($i=0; $i < count($unmatched_check[$q]); $i++){
								if($i+1 < count($unmatched_check[$q])){
									if(!empty($unmatched_check[$q][$i])){
										$add_peep[$q]['name_first']	.= ' '.$unmatched_check[$q][$i];
									}
								}
							}
						}
					}
				}
			}elseif(strpos($fam_parts[0],',') !== false){
				//For names like Doe, Jane & John
				$second_name				= explode(',',$fam_parts[0]);
				$add_peep['name_last']		= $second_name[0];
			}else{
				//For names like Jane & John Doe
				$add_peep[0]['name_first'] 		= $fam_parts[0];
				$add_peep[1]['name_first']		= null;
				$second_name					= explode(' ',$fam_parts[1]);
				$add_peep[0]['name_last'] 		= end($second_name);
				$add_peep[1]['name_last'] 		= end($second_name);


				$q = 0;
				foreach($second_name as $cur_second){
					if(!empty($cur_second) && strlen($cur_second) > 1){
						if($q+1 < count($second_name)){
							$add_peep[1]['name_first'] .= ' '.$cur_second;
						}
						$q++;
					}
				}

			}
		}
	}

	//clean up output of names
	$q = 0;
	for($q=0; $q < 4; $q++){
		$can_output		= false;
		if(!empty($add_peep[$q]['name_first'])){
			$add_peep[$q]['name_first']	= trim($add_peep[$q]['name_first']);
			$can_output	= true;
		}
		if(!empty($add_peep[$q]['name_last'])){
			$add_peep[$q]['name_last']	= trim($add_peep[$q]['name_last']);
			$can_output	= true;
		}
		if($can_output){

			if(!empty($vars['phone_foster_parent_mobile_'.$q])){
				$add_peep[$q]['people_phone_mobile'] 	= $vars['phone_foster_parent_mobile_'.$q];
			}
			if(!empty($vars['email_foster_parent_primary_'.$q])){
				$add_peep[$q]['people_email_primary'] 	= $vars['email_foster_parent_primary_'.$q];
			}
		}
	}

	return $add_peep;
}

function get_family_roles_array(){
	$arr = array();
	for($i=1; $i < 21; $i++){
		$arr[]	= $i;
	}
	return $arr;

}
function get_family_parent_roles_array(){
	//return array(5,10,20);
	$kid_roles = $this->get_family_kid_roles_array();
	for($i=1; $i < 21; $i++){
		if(!in_array($i, $kid_roles)){
			$arr[]	= $i;
		}
	}
	return $arr;
}

function get_family_kid_roles_array(){
	return array(12,13,14,15);
}

function get_families_near_church($vars){
	$arr_sql 		= array();
	$arr_place		= array();

	if(empty($vars['id_church']) && empty($vars['origin_geo_lat']) && empty($vars['origin_geo_lng'])){
		return null;
	}

	if(empty($vars['distance'])){
		$vars['distance'] = 10;
	}

	if(!empty($vars['id_church'])){
		$church		= $this->churches_model->get_church(array('id_church' => $vars['id_church']));
	}else{
		$church['church_geo_lat']	= $vars['origin_geo_lat'];
		$church['church_geo_lng']	= $vars['origin_geo_lng'];
	}

	if(!empty($church['church_geo_lng']) && !empty($church['church_geo_lat'])){

		$sql_limit = '';

		$sql = "SELECT *, dest.id_family, dest.state AS `family_state`, homechurch.church_name, homechurch.campus_name, dest.date_add, dest.date_mod, 3956 * 2 * ASIN(SQRT( POWER(SIN((".$church['church_geo_lat']."-abs(dest.family_geo_lat)) * pi()/180 / 2),2) + COS(".$church['church_geo_lat']." * pi()/180 ) * COS( abs(dest.family_geo_lat) * pi()/180) * POWER(SIN((".$church['church_geo_lng']." - dest.family_geo_lng) * pi()/180 / 2), 2) )) AS distance FROM ltp_families AS dest
		LEFT JOIN `ltp_assignments` AS a ON a.id_family = dest.id_family AND a.assignment_type = 'family_to_affiliate'
		LEFT JOIN `ltp_assignments` AS achurch ON achurch.id_family = dest.id_family AND achurch.assignment_type = 'family_to_church'
		LEFT JOIN `ltp_churches` AS homechurch ON homechurch.id_church = dest.id_church_home WHERE 1=1 ";

		$sql_place = "SELECT *, dest.id_family, dest.state AS `family_state`, homechurch.church_name, homechurch.campus_name, dest.date_add, dest.date_mod, 3956 * 2 * ASIN(SQRT( POWER(SIN((".$church['church_geo_lat']."-abs(place.place_lat)) * pi()/180 / 2),2) + COS(".$church['church_geo_lat']." * pi()/180 ) * COS( abs(place.place_lat) * pi()/180) * POWER(SIN((".$church['church_geo_lng']." - place.place_lng) * pi()/180 / 2), 2) )) AS distance FROM ltp_families AS dest
		LEFT JOIN `ltp_assignments` AS a ON a.id_family = dest.id_family AND a.assignment_type = 'family_to_affiliate'
		LEFT JOIN `ltp_places` AS place ON place.id_place = dest.id_place
		LEFT JOIN `ltp_assignments` AS achurch ON achurch.id_family = dest.id_family AND achurch.assignment_type = 'family_to_church'
		LEFT JOIN `ltp_churches` AS homechurch ON homechurch.id_church = dest.id_church_home WHERE 1=1 ";

		if(!empty($vars['omit_families'])){
			if(is_array($vars['omit_families']) && count($vars['omit_families']) > 0){
				$omit_ids	= implode(',',$vars['omit_families']);
				$sql_limit .= " AND dest.id_family NOT IN (".$omit_ids.")";
			}
		}
		if(!empty($vars['updated_since'])){
			$sql_limit .= " AND dest.date_mod > '".$vars['updated_since']."'";
		}

		if(!empty($vars['show_all'])){

		}elseif(isset($vars['status'])){
			switch(strtolower($vars['status'])){
				case 'needs_community':
					$sql_limit .= " AND dest.state > '5' AND dest.state NOT IN (5,10,40,46,22,24,44,35)";
					//$sql .= " AND (dest.id_church_add IS NULL OR dest.id_church_add < 1) AND (dest.id_church_claim IS NULL OR dest.id_church_claim < 0)) ";
					//$sql .= " OR dest.state IN (42,30)) ";
				break;

			}

		}elseif(isset($vars['state'])){
			$sql_limit .= " AND dest.state = ".$this->db->escape($vars['state']);
		}else{
			$sql_limit .= " AND dest.state > 0";
		}

		if(!empty($vars['hide_ignored'])){
			$sql_limit .= " AND (achurch.id_assignment IS NULL OR achurch.id_role > '0')";
		}

		$sql_limit .= " HAVING distance < ".$vars['distance'];


		$sql_limit .= " ORDER BY distance limit 1000";

		//Get legacy addresses first
		$sql 		.= $sql_limit;
		$query 		= $this->db->query($sql,false);


		if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
			echo '<p><strong>families_model->get_families_near_church: </strong>'.$sql.'</p>';
			exit();
		}elseif(!empty($vars['debug'])){
			echo '<p><strong>families_model->get_families_near_church: </strong>'.$sql.'</p>';
		}

		if($query -> num_rows() > 0){
			$arr_sql = $query->result_array();
		}

		//Get ltp_place addresses
		$sql_place 		.= $sql_limit;
		$query_place	= $this->db->query($sql_place,false);
		if($query_place -> num_rows() > 0){
			$arr_place 	= $query_place->result_array();
		}

		$r = array_merge($arr_sql, $arr_place);

		if(!empty($r)){
			//usort($r, function($a, $b){ return strcmp($a["distance"], $b["distance"]); });
		}

		return $r;
	}

}

function get_families_in_radius($vars){

	return $this->get_families_near_church($vars);

}


function get_churches_near_family($vars){

	if(empty($vars['id_family']) && empty($vars['origin_geo_lat']) && empty($vars['origin_geo_lng'])){
		return null;
	}

	if(empty($vars['distance'])){
		$vars['distance'] = 10;
	}

	if(!empty($vars['id_family'])){
		$family		= $this->families_model->get_family(array('id_family' => $vars['id_family']));
	}else{
		$family['family_geo_lat']	= $vars['origin_geo_lat'];
		$family['family_geo_lng']	= $vars['origin_geo_lng'];
	}


	if(!empty($family['family_geo_lng']) && !empty($family['family_geo_lat'])){


		$sql = "SELECT *, dest.id_church, dest.state AS `church_state`, dest.date_add, dest.date_mod, 3956 * 2 * ASIN(SQRT( POWER(SIN((".$family['family_geo_lat']."-abs(dest.church_geo_lat)) * pi()/180 / 2),2) + COS(".$family['family_geo_lat']." * pi()/180 ) * COS( abs(dest.church_geo_lat) * pi()/180) * POWER(SIN((".$family['family_geo_lng']." - dest.church_geo_lng) * pi()/180 / 2), 2) )) AS distance FROM ltp_churches AS dest
		LEFT JOIN `ltp_assignments` AS a ON a.id_church = dest.id_church AND a.assignment_type = 'church_to_affiliate'
		HAVING distance < ".$vars['distance']." AND dest.id_church > 0  AND dest.state = 40";

		if(!empty($vars['omit_churches'])){
			if(is_array($vars['omit_churches']) && count($vars['omit_churches']) > 0){
				$omit_ids	= implode(',',$vars['omit_churches']);
				$sql .= " AND dest.id_church NOT IN (".$omit_ids.")";
			}
		}
		if(!empty($vars['updated_since'])){
			$sql .= " AND dest.date_mod > '".$vars['updated_since']."'";
		}


		$sql .= " ORDER BY distance limit 1000";
		$query = $this->db->query($sql,false);

		if($query -> num_rows() > 0){
			$r = $query->result_array();

			return $r;
		}
	}

}

function update_families_missing_geocodes($vars=null){
	$result  = array();
	$sql = "SELECT `id_family` FROM `ltp_families` WHERE `family_geo_lat` IS NULL ORDER BY `date_add` DESC LIMIT 5000";
	$query = $this->db->query($sql,false);


	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>families_model->update_families_missing_geocodes: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>families_model->update_families_missing_geocodes: </strong>'.$sql.'</p>';
	}

	if($query -> num_rows() > 0){
	   $families = $query->result_array();


	   foreach($families as $family){

			$cur_id						= $family['id_family'];
			$fam						= $this->families_model->get_family($family);
			$members					= $this->get_foster_family_members($family);
			$update						= array();
			$update['id_mod']			= 1;
			$update['date_mod']			= time();
			$can_update					= false;
			$arr_id_parent_roles		= $this->get_family_parent_roles_array();


			//check for family members that are already geocoded
			if(!empty($members)){
				foreach($members as $member){
					if(!$can_update && in_array($member['id_role'], $arr_id_parent_roles) && !empty($member['people_geo_lat']) && !empty($member['people_geo_lng'])){
						$update['family_geo_lat']		= $member['people_geo_lat'];
						$update['family_geo_lng']		= $member['people_geo_lng'];
						$can_update						= true;
					}
				}
			}

			if(!$can_update && !empty($update['family_address_street_1']) && !empty($update['family_address_city']) && !empty($update['family_address_state'])){

				$address						= $update['address_street_1'];
				if(!empty($update['family_address_street_2'])){
					$address					.= ' '.$update['family_address_street_2'];
				}
				if(!empty($update['family_address_city'])){
					$address					.= ' '.$update['family_address_city'];
				}
				if(!empty($update['family_address_state'])){
					$address					.= ' '.$update['family_address_state'];
				}
				if(!empty($update['family_address_zip'])){
					$address					.= ' '.$update['family_address_zip'];
				}
				$geocode								= $this->website_model->geocode($address);

				if(!empty($geocode['geocode'])){
					$update['family_geocode'] 		= $geocode['geocode'];
					$update['family_geo_lat']		= $geocode['lat'];
					$update['family_geo_lng']		= $geocode['lng'];
					$can_update						= true;
				}
			}

			if($can_update){

				$this->db->where('id_family', $cur_id);
				if($this->db->update('ltp_families', $update)){
					$result[$cur_id]['db_update'] 				= TRUE;
					$result[$cur_id]['status'] 					= TRUE;
					$result[$cur_id]['id_family']				= $cur_id;
					$result[$cur_id]['result']					= 'success';
					$result[$cur_id]['method']					= 'update';
					$result[$cur_id]['data']					= $update;
				}
			}

	   }
	}

	return $result;
}

function sanitize_parent_list($parents){
	$hashed_out			= array();
	$q 					= 0;
	$new_parents		= $parents;

	foreach($parents as $i => $cur_parent){
		if(!empty($cur_parent['name_first'])){
			$hash	= hash_challenge($cur_parent['name_first']);

			if(!isset($best_choice[$hash])){
				$best_choice[$hash]	= array('id' => null, 'score' => 0);
			}
			if($best_choice[$hash]['score'] < 50 && !empty($cur_parent['name_first']) && !empty($cur_parent['name_last']) && !empty($cur_parent['people_phone_mobile']) && !empty($cur_parent['people_email_primary'])){
				$best_choice[$hash]['id'] 		= $i;
				$best_choice[$hash]['score'] 	= 50;
			}
			if($best_choice[$hash]['score'] < 40 && !empty($cur_parent['name_first']) && !empty($cur_parent['name_last']) && !empty($cur_parent['people_phone_mobile'])){
				$best_choice[$hash]['id'] 		= $i;
				$best_choice[$hash]['score'] 	= 40;
			}
			if($best_choice[$hash]['score'] < 30 && !empty($cur_parent['name_first']) && !empty($cur_parent['name_last']) && !empty($cur_parent['people_email_primary'])){
				$best_choice[$hash]['id'] 		= $i;
				$best_choice[$hash]['score'] 	= 30;
			}
			if($best_choice[$hash]['score'] < 20 && !empty($cur_parent['name_first']) && !empty($cur_parent['name_last'])){
				$best_choice[$hash]['id'] 		= $i;
				$best_choice[$hash]['score'] 	= 20;
			}
			if($best_choice[$hash]['score'] < 10 && !empty($cur_parent['name_first'])){
				$best_choice[$hash]['id'] 		= $i;
				$best_choice[$hash]['score'] 	= 10;
			}
		}
	}

	foreach($parents as $i => $cur_parent){
		if(!empty($cur_parent['name_first'])){
			$hash	= hash_challenge($cur_parent['name_first']);

			if($best_choice[$hash]['id'] == $i && !in_array($hash, $hashed_out)){
				$hashed_out[]		= $hash;
				$new_parents[$q]	= $cur_parent;
				$q++;
			}
		}
	}

	return $new_parents;

}

function legacy_correct_family_address($vars){
	$arr_fam_roles_to_check		= array('community_family_dad', 'community_family_mom', 'community_family_parent');

	if(empty($vars['assigned']) && !empty($vars['force_assigned'])){
		$fam = $this->get_family(array('id_family' =>$vars['id_family'], 'with_assignments' => 1));
		if(!empty($fam['assigned'])){
			$vars['assigned']	= $fam['assigned'];
		}
	}

	if(!empty($vars['assigned'])){
		foreach($vars['assigned'] as $assigned){
			if(!empty($assigned['role_scope_segment'])){
				if(in_array($assigned['role_scope_segment'], $arr_fam_roles_to_check)){
					if(empty($vars['family_address_street_1']) && !empty($assigned['address_street_1'])){
						$vars['family_address_street_1']	= $assigned['address_street_1'];
					}
					if(empty($vars['family_address_street_2']) && !empty($assigned['address_street_2'])){
						$vars['family_address_street_2']	= $assigned['address_street_2'];
					}
					if(empty($vars['family_address_city']) && !empty($assigned['address_city'])){
						$vars['family_address_city']	= $assigned['address_city'];
					}
					if(empty($vars['family_address_state']) && !empty($assigned['address_state'])){
						$vars['family_address_state']	= $assigned['address_state'];
					}
					if(empty($vars['family_address_zip']) && !empty($assigned['address_zip'])){
						$vars['family_address_zip']	= $assigned['address_zip'];
					}
					if(empty($vars['family_address_country']) && !empty($assigned['address_country'])){
						$vars['family_address_country']	= $assigned['address_country'];
					}
					if(empty($vars['family_address_county']) && !empty($assigned['address_county'])){
						$vars['family_address_county']	= $assigned['address_county'];
					}
					if(empty($vars['family_geo_lat']) && !empty($assigned['people_geo_lat'])){
						$vars['family_geo_lat']	= $assigned['people_geo_lat'];
					}
					if(empty($vars['family_geo_lng']) && !empty($assigned['people_geo_lng'])){
						$vars['family_geo_lng']	= $assigned['people_geo_lng'];
					}
				}
			}
		}
	}



	if(empty($vars['bypass_place_address']) && !empty($vars['id_place'])){
		$vars['family_address_street_1']	= $vars['family_place_street_number'].' '.$vars['family_place_street'];
		$vars['family_address_city']		= $vars['family_place_city'];
		$vars['family_address_state']		= $vars['family_place_state'];
		$vars['family_address_zip']			= $vars['family_place_zip'];
		$vars['family_address_county']		= $vars['family_place_county'];
		$vars['family_address_country']		= $vars['family_place_country'];
		$vars['family_geo_lat']				= $vars['family_place_lat'];
		$vars['family_geo_lng']				= $vars['family_place_lng'];
		$vars['family_geocode']				= $vars['family_place_lat'].', '.$vars['family_place_lng'];
		$vars['address_street_1']			= $vars['family_place_street_number'].' '.$vars['family_place_street'];
		$vars['address_city']				= $vars['family_place_city'];
		$vars['address_state']				= $vars['family_place_state'];
		$vars['address_zip']				= $vars['family_place_zip'];
		$vars['address_county']				= $vars['family_place_county'];
		$vars['address_country']			= $vars['family_place_country'];
		$vars['geo_lat']					= $vars['family_place_lat'];
		$vars['geo_lng']					= $vars['family_place_lng'];
		$vars['geocode']					= $vars['family_place_lat'].', '.$vars['family_place_lng'];
	}


	return $vars;
}

function get_family_needs($vars){
	$vars = format_array_vals($vars, 'id_family');

	if(!empty($vars['id_family'])){
		$sql = "SELECT a.id_assignment,
		n.*,
		f.*,
		f.state AS `family_state`
		FROM `ltp_assignments` AS a
		LEFT JOIN `ltp_families` AS f ON a.id_family = f.id_family
		LEFT JOIN `ltp_needs` AS n ON n.id_need = a.id_need
		WHERE a.assignment_type = 'need_to_family' AND a.state > 0 AND a.id_need > 0 AND a.id_family = ".$this->db->escape($vars['id_family']);

		$query = $this->db->query($sql,false);

		if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
			echo '<p><strong>families_model->get_families: </strong>'.$sql.'</p>';
			exit();
		}elseif(!empty($vars['debug'])){
			echo '<p><strong>families_model->get_families: </strong>'.$sql.'</p>';
		}


		if($query->num_rows() > 0){

			$r = $query->result_array();

			return $r;
		}

	}

	return array();

}

function get_list_view_best_match_family_name($vars){
	$r						= 'Not calculated';
	$arr_checked 			= array();
	$limit_families			= false;
	$states_to_show			= array(30,42,44);


	if(!empty($vars['id_families']) && empty($vars['bypass_family_limit'])){
		$limit_families			= true;
		$vars['id_families']	= array_unique($vars['id_families']);
	}

	if(!empty($vars['id_people'])){
		 $peep_unit_id	= 'p'.$vars['id_people'];
	 }

	if(!empty($vars['params']['people_geomatch']['families_near_volunteer'])){

		$cur_fams			= json_decode($vars['params']['people_geomatch']['families_near_volunteer'], true);
		$fam_count			= count($cur_fams);
		$i 					= 1;
		$span_added			= false;
		$r 					= 'No nearby families found';

		if(!empty($cur_fams)){

			unset($arr_checked);
			$arr_checked	= array();
			foreach($cur_fams as $cur_fam){

				//if(!in_array($cur_fam['id_family'], $arr_checked) && (!$limit_families || ($limit_families && in_array($cur_fam['id_family'], $vars['id_families'])))){
				if(!in_array($cur_fam['id_family'], $arr_checked) && in_array($cur_fam['family_state'], $states_to_show)){

					if($i == 1){
						$r = '<div class="col-sm-12 col-xs-12">';
					}

					if($i == 3 && $fam_count >= 2){
						$span_added 	= true;
						$r 				.= '<span class="collapse" id="family-best-matches-collapse-'.$peep_unit_id.'">';
					}


					$fam_ajax_link = '<a class="btn-modal-with-ajax" href="#modalnotify" data-toggle="modal" data-modalheader="View Family Info - '.$cur_fam['family_name'].'" data-ajaxurl="'.base_url().'families/ajax_claim_ignore_family/?match_type=location&mode=view&f='.url_enc($cur_fam['id_family']).'">';

					$r .= ' <div class="row">'.$fam_ajax_link.$cur_fam['family_name'].'</a> <small>'.number_format($cur_fam['distance'], 2).' miles</small></div>';

					$i++;
					$arr_checked[]	= $cur_fam['id_family'];

					if($span_added && $i >= $fam_count){
						$r .='</span><div class="row"><a href="#family-best-matches-collapse-'.$peep_unit_id.'" data-toggle="collapse"><small>Show / Hide '.($fam_count - 1).' more</small></a></div></div>';
					}


				}

			}
		}
	}

	if(hash_challenge($r) == 'notcalculated'){
		$addr = $this->places_model->standardize_address($vars);
		if(empty($addr)){
			$r = 'No address set';
		}
	}


	return $r;
}

 function save_family_update($data=NULL){
	$post_check 			= $this->input->post('posted');
	$db_update 				= false;
	$state					= null;
	$user					= array();
	$debug					= null;
	$data['scope']			= 'family';
	$human_post				= $this->website_model->is_human_posted($data);
	$user					= $this->website_model->get_user_session();

	if(isset($data['state'])){
		$state					= $data['state'];
	}

	if(empty($user['id_people'])){
		$user['id_people']		= 1;
	}

	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}

	//Backup $data to $vars before keys are stripped
	$vars						= $data;

	//Double check for id_family
	if(empty($data['id_update']) && !empty($data['id_update_encoded'])){
		$data['id_update']		= url_dec($data['id_update_encoded']);
	}

	if(!empty($data['id_date'])){
		$data['id_date']	= url_dec($data['id_date']);
	}


	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_family_updates');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}

	$data['date_mod'] 			= time();
	$data['id_mod']				= $user['id_people'];


	if(empty($data['state']) && !empty($vars['update_state'])){
		$data['state']				= 	$vars['update_state'];
	}elseif(!isset($data['state']) && empty($data['id_update'])){
		$data['state'] 				= 1;
	}

	//Check to update table first
	if(!empty($data['id_update'])){

		$this->db->where('id_update', $data['id_update']);
		if($this->db->update('ltp_family_updates', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_update']			= $data['id_update'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['date_add'] 					= time();
		$data['id_add']						= $user['id_people'];


		if ($this->db->insert('ltp_family_updates', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_update']			= $this->db->insert_id();
			$result['result']				= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['data']['id_update']			= $result['id_update'];
	$result['debug']						= $debug;

	/*
	if(!empty($result['id_update']) && empty($vars['bypass_assignments'])){

		if(empty($vars['id_affiliate'])){
			$vars['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		}

		$result['assign'] = $this->people_model->save_assignment(array('id_family' => $result['id_family'], 'id_affiliate' => $vars['id_affiliate'], 'assignment_type' => 'family_to_affiliate'));


	}
	*/
	return $result;
}

function is_family_actively_served($vars){
	$vars 					= format_array_vals($vars, 'id_family');
	$arr_active_states		= array(32,46);

	if(empty($vars['id_family'])){
		return false;
	}

	$data['family']	= $this->get_family(array('id_family' => $vars['id_family']));

	if(!empty($data['family']['state'])){
		if(in_array($data['family']['state'], $arr_active_states)){
			if(!empty($vars['use_family_status_only'])){
				return true;
			}

			//Deep check to make sure care community is active
			$cc 	= $this->communities_model->get_active_care_community_for_family(array('id_family' => $vars['id_family']));
			//dds($cc);
			if(!empty($cc)){
				return true;
			}
		}
	}

	return false;


}

function is_family_active_for_event_email_reminders($vars){
    $vars 					= format_array_vals($vars, 'id_family');
    $arr_active_states		= array(32,40,41,42,43,44,45,46,47,48,49);

    if(empty($vars['id_family'])){
        return false;
    }

    $data['family']	= $this->get_family(array('id_family' => $vars['id_family']));

    if(!empty($data['family']['state'])){
        if(in_array($data['family']['state'], $arr_active_states)){
            if(!empty($vars['use_family_status_only'])){
                return true;
            }

            //Deep check to make sure care community is active
            $cc 	= $this->communities_model->get_active_care_community_for_family(array('id_family' => $vars['id_family']));
            //dds($cc);
            if(!empty($cc)){
                return true;
            }
        }
    }

    return false;


}

function get_family_member($vars){
	$r = $this->get_family_members($vars);
	if(!empty($r[0])){
		return $r[0];
	}

	return array();
}

function get_family_members($vars){
	$vars 				= format_array_vals($vars, 'id_family');
	$peeps				= array();
	$people				= array();
	$vars['debug']		= isset($vars['debug']) ? $vars['debug'] : 0;
	$primary_contact	= null;
	$vars['order']		= !empty($vars['order']) ? $vars['order'] : "FIELD(a.id_role, 1,3,5,17,6,9,2,10,7,20,3)";

	if(!empty($vars['id_family'])){
		$assign_vars		= array('id_family' => $vars['id_family'],
									'assignment_type' => 'people_to_family',
		                            'id_role_gte' => 1,
		                            'id_role_lte' => 24,
									'debug' => $vars['debug']);

		if(!empty($vars['id_people'])){
			$assign_vars['id_people']	= $vars['id_people'];
		}

		$assigns 	= $this->website_model->get_assignments($assign_vars);

		if(!empty($assigns)){
			foreach($assigns as $cur){
				$peeps[]	                       = $cur['id_people'];

				//check for primary contact
				if($cur['id_role'] == 24){
					$primary_contact				= $cur['id_people'];
				}

				if($cur['id_role'] < 21){
					$roles[$cur['id_people']]        = $cur['id_role'];
				}
			}
			if(!empty($peeps)){
				$people = $this->people_model->get_people(array('people_ids' => $peeps, 'order' => $vars['order'], 'allow_limiters' => 1, 'status' => 'not_deleted' ));

				if(!empty($people)){
				    foreach($people as $cur_key => $cur_val){
						if(!empty($roles[$cur_val['id_people']])){
							$people[$cur_key]['id_role']    			= $roles[$cur_val['id_people']];
							$people[$cur_key]['primary_contact']		= null;
							if($primary_contact == $cur_val['id_people']){
								$people[$cur_key]['primary_contact']	= 1;
							}
						}
				    }
				}
			}
		}
		return $people;
	}
}

function remove_family_member($vars){
	$result['db_update'] 	= array('db_update' => FALSE, 'status' => FALSE, 'data' => array());


	$vars['state']			= !empty($vars['state']) ? $vars['state'] : -2;
	$vars['date_end']		= !empty($vars['date_end']) ? $vars['date_end'] : time();
	$user					= $this->website_model->get_user_session();

	if(!empty($vars['id_family']) && !empty($vars['id_people'])){
		$assign_vars		= array('id_family' => $vars['id_family'],
									'id_people' => $vars['id_people'],
									'assignment_type' => 'people_to_family',
									'id_role_gte' => 1,
									'id_role_lte' => 24,
									'debug' => 0);

		$assigns 			= $this->website_model->get_assignments($assign_vars);

		if(!empty($assigns)){
			foreach($assigns as $cur_assign){
				$id_assignments[]	= $cur_assign['id_assignment'];
			}

			if(!empty($id_assignments)){
				$id_assignments 		= implode(',',$id_assignments);
				$sql 					= "UPDATE `ltp_assignments` SET `state` = '".$vars['state']."',
										`date_removed` = '".time()."',
										`date_mod` = '".time()."',
										`id_mod` = '".$user['id_people']."',
										`id_removed` = '".$user['id_people']."',
										`date_end` = '".$vars['date_end']."'
										WHERE `id_assignment` IN (".$id_assignments.")";
				$query				 	= $this->db->query($sql,false);

				$result['db_update'] 		= TRUE;
				$result['status'] 			= TRUE;
				$result['id_family']		= $vars['id_family'];
				$result['id_people']		= $vars['id_people'];
				$result['result']			= 'success';
				$result['method']			= 'update';
				$result['data']				= $vars;
				$result['id_assignments']	= $id_assignments;
			}
		}


	}

	return $result;
}

function get_parent_role_ids_male(){
	return array(1,5,6,9,17);

}

function get_parent_role_ids_female(){
	return array(2,7,10,8,16,18);

}

function get_parent_role_ids_generic(){
	return array(3,20);
}

function map_generic_role_to_gender_specific_role($vars){

	$vars['people_gender']	= !empty($vars['people_gender']) ? $vars['people_gender'] : null;
	$vars['id_role']		= !empty($vars['id_role']) ? $vars['id_role'] : null;

	switch(strtolower($vars['people_gender'])){
		case 'male':
		case 'm':

			switch($vars['id_role']){
				case 20:
					return 5; //foster dad
				break;
				case 3:
					return 1; //bio dad
				break;
				case 2:
					return 1; //bio dad
				break;
				case 10:
					return 5; //foster dad
				break;
				case 7:
					return 6; //grandfather
				break;
				case 8:
					return 9; //uncle
				break;
				case 16:
					return 17; //adoptive dad
				break;


			}

		break;
		case 'female':
		case 'f':

			switch($vars['id_role']){
				case 20:
					return 10; //foster mom
				break;
				case 3:
					return 2;
				break;
				case 1:
					return 2; //bio mom
				break;
				case 5:
					return 10; //foster mom
				break;
				case 6:
					return 7; //grandmother
				break;
				case 9:
					return 8; //aunt
				break;
				case 17:
					return 16; //adoptive mom
				break;
			}

		break;

	}

	return $vars['id_role'];
}

function get_family_members_count($vars){
	$vars 		= format_array_vals($vars, 'id_family');
	$members 	= $this->get_family_members($vars['id_family']);
	if(empty($members)){
		return 0;
	}

	return count($members);

}

function get_family_timeline_point($vars){
	$vars					= format_array_vals($vars, 'id_tp');
	$vars['return_schema']	= 1;
	if(!empty($vars['id_tp'])){
		$r						= $this->get_family_timeline_points($vars);
		if(!empty($r[0])){
			return $r[0];
		}
	}

	return $this->website_model->get_table_schema('ltp_families_timeline_points');
}

function get_family_timeline_points($vars){
	$vars					= format_array_vals($vars, 'id_family');
	$vars['debug']			= 0;

	$sql = "SELECT tp.*,
			f.family_name
			FROM ltp_families_timeline_points AS tp
			LEFT JOIN ltp_families AS f ON f.id_family = tp.id_family WHERE 1=1";

	if(!empty($vars['id_tp'])){
		$sql .= " AND tp.id_tp = ".$this->db->escape($vars['id_tp']);
	}else{
		$vars['allow_limiters'] 	= 1;
	}

	if(!empty($vars['allow_limiters'])){

		if(!empty($vars['id_family'])){
			$sql .= " AND tp.id_family = ".$this->db->escape($vars['id_family']);
		}

		if(isset($vars['order'])){
			$sql .= " ORDER BY ".$vars['order'];
		}else{
			$sql .= " ORDER BY tp.date_start DESC, tp.date_end";
		}
		if(isset($vars['order_dir'])){
			$sql .= " ".$vars['order_dir'];
		}else{
			$sql .= " DESC";
		}
		if(isset($vars['limit'])){
			$sql .= " LIMIT ".$vars['limit'];
		}elseif(empty($vars['no_limit'])){
			$sql .= " LIMIT 0,2000";
		}

	}//End view if

	$query = $this->db->query($sql,false);

	if(!empty($vars['debug']) && $vars['debug'] == 'stop'){
		echo '<p><strong>families_model->get_family_timeline_points: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>families_model->get_family_timeline_points: </strong>'.$sql.'</p>';
	}


	if($query->num_rows() > 0){
		$r = $query->result_array();
		return $r;
	}elseif(!empty($vars['return_schema'])){
		return $this->website_model->get_table_schema('ltp_families_timeline_points');
	}
}

function save_family_timeline_point($data=null){

	$user					= $this->website_model->get_user_session();
	$post_check 			= $this->input->post('posted');
	$db_update 				= false;
	$state					= null;
	$debug					= null;
	$data['scope']			= 'family';
	$human_post				= $this->website_model->is_human_posted($data);
	$data['date_start']		= !empty($data['date_start']) ? $data['date_start'] : strtotime($data['date_start_human']);


	if(isset($data['state'])){
		$state					= $data['state'];
	}

	if(empty($user['id_people'])){
		$user['id_people']			= 1;
	}

	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}

	//Backup $data to $vars before keys are stripped
	$vars								= $data;


	/*
	$arr_switches 				= $this->website_model->get_switches_fields('ltp_families_timeline_points');
	//dds($arr_switches);

	foreach($arr_switches as $chk_key){
		$prev_key						= $chk_key.'_prev';
		if(isset($data[$chk_key])){
			if(!empty($data[$chk_key])){
				$data[$chk_key]	= 1;
			}else{
				$data[$chk_key]	= 0;
			}
		}elseif(!empty($vars[$prev_key])){
			$data[$chk_key]		= 0;
		}
	}
	*/


	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_families_timeline_points');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}


	$data['date_mod'] 			= time();
	$data['id_mod']				= $user['id_people'];


	if(empty($data['state']) && !empty($vars['tp_state'])){
		$data['state']				= 	$vars['tp_state'];
	}elseif(!isset($data['state']) && empty($data['id_tp'])){
		$data['state'] 				= 1;
	}

	//Check to update table first
	if(!empty($data['id_tp'])){

		$this->db->where('id_tp', $data['id_tp']);
		if($this->db->update('ltp_families_timeline_points', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_tp']				= $data['id_tp'];
			$result['result']					= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['date_add'] 					= time();
		$data['id_add']						= $user['id_people'];


		if ($this->db->insert('ltp_families_timeline_points', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_tp']				= $this->db->insert_id();
			$result['result']				= 'success';
			$result['method']				= 'insert';
			$result['data']					= $data;
		}
	}

	$result['data']							= $data;
	$result['data']['id_tp']				= $result['id_tp'];
	$result['debug']						= $debug;


	return $result;
}

function make_family_timeline($vars){
	$vars		= format_array_vals($vars, 'id_family');
	$r			= array('st' => 1, 'msg' => '', 'data' => array(), 'html' => '');
	$r['html']	= '<ul class="ps-timeline">';
	$k			= 1;
	$cur_class	= '';

	if(!empty($vars['id_family'])){
		$points = $this->get_family_timeline_points($vars['id_family']);


		if(!empty($points)){
			foreach($points as $cur){
				$cur_class	= $k == 1 ? '' : 'ps-timeline-inverted';
				$cur_date	= date_offset('m/d/Y', $cur['date_start']);
				if(!empty($cur['date_end']) && hash_challenge($cur['date_end']) != hash_challenge($cur['date_start'])){
					$cur_date .= ' '.date_offset('m/d/Y', $cur['date_end']);
				}
				$r['html']	.= '
				<li class="'.$cur_class.'">
				  <div class="ps-timeline-badge"><i class="glyphicon glyphicon-check"></i></div>
				  <div class="ps-timeline-panel">
					<div class="ps-timeline-heading">
					  <h4 class="ps-timeline-title">'.$this->make_family_timeline_point_title($cur).'</h4>
					  <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> '.$cur_date.'</small></p>
					</div>
					<div class="ps-timeline-body">
					  <p>'.$this->make_family_timeline_point_text($cur).'</p>
					</div>
				  </div>
				</li>';
				$k = 1 - $k;

			}
		}else{
			$r['html'] = '<h3 class="text-center">No family timline points have been added.</h3>';
		}
	}

	$r['html'] .= '</ul>';

	return $r['html'];

}

function make_family_timeline_point_title($vars){
	$vars['id_tp_event']	= !empty($vars['id_tp_event']) ? $vars['id_tp_event'] : 0;
	$r 						= '';

	switch($vars['id_tp_event']){
		case 110:
			$r = 'Started Foster Parent Training';
		break;
		case 120:
			$r = 'Completed Foster Parent Training';
		break;
		case 130:
			$r = 'Completed Homestudy';
		break;
		case 140:
			$r = 'Received Approval to Foster';
		break;
		case 150:
			$r = 'Placement Started';
		break;
		case 160:
			$r = 'TPR';
		break;
		case 310:
			$r = 'Reunification plan started';
		break;
		case 320:
			$r = 'Reunification plan completed';
		break;
		case 330:
			$r = 'TPR';
		break;
		case 910:
			$r = 'Placement Ended (Reunification)';
		break;
		case 920:
			$r = 'Placement Ended (Placed in new home)';
		break;
		case 930:
			$r = 'Placement Ended (Adoption)';
		break;
		case 940:
			$r = 'Placement Ended (Aged out)';
		break;
		case 960:
			$r = 'Placement';
		break;
		case 970:
			$r = 'Finalization';
		break;
		case 980:
			$r = 'Reunification';
		break;

		default:
			$r = '';
		break;
	}

	return $r;
}

function make_family_timeline_point_text($vars){
	$vars['id_tp_event']	= !empty($vars['id_tp_event']) ? $vars['id_tp_event'] : 0;
	$r 						= '';
	$kid_names				= !empty($vars['name_preferred']) ? $vars['name_preferred'] : null;
	if(!empty($vars['tp_id_child'])){
		$kids		= $this->people_model->get_people(array('people_ids' => explode(',',$vars['tp_id_child']), 'bypass_affiliate' => 1, 'bypass_security' => 1));

		if(!empty($kids)){
			$kid_names_arr 			= array();
			$kid_count				= 0;
			foreach($kids as $cur_kid){
				if(!empty($cur_kid['name_preferred'])){
					$kid_names_arr[] 	= $cur_kid['name_preferred'];
					$kid_count++;
				}
			}
			if($kid_count == 1){
				$kid_names 	= $kid_names_arr[0];
			}elseif($kid_count > 1){
				$kid_names = '';
				$i = 0;
				foreach($kid_names_arr as $cur_kid){
					if($i + 1 == $kid_count){
						$kid_names .= $cur_kid.' and ';
					}else{
						$kid_names .= $cur_kid.', ';
					}
					$i++;
				}
				$kid_names = rtrim(', ',$kid_names);
			}
		}
	}

	switch($vars['id_tp_event']){
		case 110:
			$r .= 'Started Foster Parent Training';
		break;
		case 120:
			$r .= 'Completed Foster Parent Training';
		break;
		case 130:
			$r .= 'Completed Homestudy';
		break;
		case 140:
			$r .= 'Received Approval to Foster';
		break;
		case 150:
			$r .= 'Placement Started';
			if(!empty($kid_names)){
				$r .= ' for '.$kid_names;
			}
			if(!empty($vars['date_start']) && !empty($vars['date_end'])){
				$days = ceil(($vars['date_end'] - $vars['date_start']) / 86400);
				$r .= ' on '.date_offset('F j, Y', $vars['date_start']).' and ended on '.date_offset('F j, Y', $vars['date_end']);
				if(!empty($days) && $days > 0){
					$r .= ' ('.$days.' days)';
				}
			}elseif(!empty($vars['date_start'])){
				$r .= ' on '.date_offset('F j, Y', $vars['date_start']);
			}
			$r .= '.';
		break;
		case 160:
			$r .= 'TPR';
		break;
		case 910:
			$r .= 'Placement Ended (Reunification)';
		break;
		case 920:
			$r .= 'Placement Ended (Placed in new home)';
		break;
		case 930:
			$r .= 'Placement Ended (Adoption)';
		break;
		case 940:
			$r .= 'Placement Ended (Aged out)';
		break;

		default:
			$r .= '';
		break;
	}

	rtrim($r, '<br />');

	return $r;
}

function make_family_updates_list_table($vars=null){
	$r 								= array('st' => 1, 'msg' => '', 'code' => '', 'html' => '', 'data' => array());


	$r['html'] .= '<table id="'.$vars['table_id'].'" class="table table-striped table-bordered table-responsive dt-responsive wrap '.$this->website_model->get_table_view_consolidation_class().'" cellspacing="0" width="100%">
						<thead>
							<tr>
								<th class="text-center" width="15%">Author</th>
								<th width="75%">Update</th>
								<th class="text-center" width="10%">Date</th>
							</tr>
						</thead>
					<tbody>
						<tr><td colspan="3"><h4 class="text-center">No Family Updates Found</td></tr>
					</tbody>
				</table>';



	return $r['html'];
}

function get_family_church_assignment($vars){
	$r = $this->get_family_church_assignments($vars);
	if(!empty($r[0])){
		return $r[0];
	}

	return array();
}

function get_family_church_assignments($vars){
	$r 						= array();
	$arr					= array();
	$roles					= array();
	$vars 					= format_array_vals($vars, 'id_family');
	//$data['churches']		= $this->churches_model->get_churches(array('include_home_churches' => 1, 'group_churches' => 1, 'bypass_church' => 1, 'bypass_security' => 1, 'bypass_affiliate' => 1, 'associated' => 1));
	$vars['assignment']		= $this->website_model->get_assignments(array('id_family' => $vars['id_family'], 'assignment_type' => 'family_to_church', 'show_all' => 1));
	//$vars['assignment']		= $this->website_model->get_assignments(array('id_family' => $vars['id_family'], 'assignment_type' => 'family_to_church'));


	if(!empty($vars['assignment'])){
		foreach($vars['assignment'] as $cur){
			$arr['id_assignment']		= $cur['id_assignment'];
			$arr['id_affiliate']		= $cur['id_affiliate'];
			$arr['id_family']			= $cur['id_family'];
			$arr['id_role']				= $cur['id_role'];
			$arr['role_name']			= $cur['role_name'];
			$arr['id_church']			= $cur['id_church'];
			$arr['date_start']			= $cur['date_start'];
			$arr['date_end']			= $cur['date_end'];
			$arr['state']				= $cur['state'];
			$arr['church_name']			= $this->churches_model->get_church_name(array('id_church' => $cur['id_church'], 'debug' => 1));
			$arr['connection_type']		= '';
			$r[]						= $arr;
			$roles[]					= $arr['id_role'];

		}
	}

	//LEGACY SUPPORT - get different church assignments on family record
	$arr_keys	= array('id_church_recruited', 'id_church_home', 'id_church_add', 'id_church_claim');
	$fam 		= $this->get_family(array('id_family' => $vars['id_family']));


	if(!empty($fam)){
		foreach($arr_keys as $key){
			$arr						= array();
			$arr['id_family']			= $vars['id_family'];
			$arr['id_church']			= $fam[$key];
			$arr['date_start']			= $fam['date_add'];
			$arr['date_end']			= '';
			$arr['state']				= 40;
			$arr['church_name']			= $this->churches_model->get_church_name(array('id_church' => $fam[$key]));
			$arr['date_start']			= $fam['date_add'];
			$arr['id_church']			= $fam[$key];
			switch($key){
				case 'id_church_recruited':
					$arr['connection_type']		= 'recruited';
					$arr['role_name']			= 'Recruited Church';
					$cur_role					= 236;

				break;
				case 'id_church_home':
					$arr['connection_type']		= 'home';
					$arr['role_name']			= 'Home Church';
					$cur_role					= 230;
				break;
				case 'id_church_add':
					$arr['connection_type']		= 'add';
					$arr['role_name']			= 'Assigned Church';
					$cur_role					= 234;
				break;
				case 'id_church_claim':
					$arr['connection_type']		= 'claimed';
					$arr['role_name']			= 'Claimed Church';
					$cur_role					= 232;
				break;
			}

			if(!in_array($cur_role, $roles) && !empty($arr['id_church'])){
				$r[]	= $arr;
			}
		}
	}



	return $r;
}

function make_family_church_assignments_list($vars){
	$r						= array('st' => 1, 'msg' => '', 'data' => array(), 'html' => '');
	$arr					= array();
	$vars 					= format_array_vals($vars, 'id_family');
	//$data['churches']		= $this->churches_model->get_churches(array('include_home_churches' => 1, 'group_churches' => 1, 'bypass_church' => 1, 'bypass_security' => 1, 'bypass_affiliate' => 1, 'associated' => 1));
	$vars['assignments']	= $this->get_family_church_assignments($vars['id_family']);

	$count 				= 0;
	$churches_shown		= array();
	$r['html']		.= '<fieldset class="top30"><legend>Active Assignments</legend><table class="table table-responsive table-striped table-bordered"><theader><tr><th>Church</th><th>Assignment</th><th>Date</th></theader><tbody>';
	if(!empty($vars['assignments'])){
		foreach($vars['assignments'] as $cur){
			if(!empty($cur['id_church']) && !in_array($cur['id_church'].hash_challenge($cur['role_name']), $churches_shown)){
				$churches_shown[]	= $cur['id_church'].hash_challenge($cur['role_name']);
				if($cur['state'] > 0  && empty($cur['date_removed'])){
					$cur['debug'] = 1;
					$r['html']	.= '<tr><td>'.$this->churches_model->get_church_name($cur).'</td><td>'.$cur['role_name'].'</td><td>Assigned '.date_offset('m/d/Y', $cur['date_start']).'</td></tr>';
					$count++;
				}
			}
		}
	}
	if(empty($count)){
		$r['html'] .= '<tr><td colspan="4"><h3 class="text-center">No past assignments found.</h3></td></tr>';
	}
	$r['html'] 	.= '</tbody></table><fieldset>';

	$count 				= 0;
	$churches_shown		= array();
	$r['html']		.= '<fieldset class="top30"><legend>Past Assignments</legend><table class="table table-responsive table-striped table-bordered"><theader><tr><th>Church</th><th>Assignment</th><th>Date</th></theader><tbody>';
	if(!empty($vars['assignments'])){
		foreach($vars['assignments'] as $cur){
			if(!empty($cur['id_church']) && !in_array($cur['id_church'].hash_challenge($cur['role_name']), $churches_shown)){
				$churches_shown[]	= $cur['id_church'].hash_challenge($cur['role_name']);
				if($cur['state'] < 1  || !empty($cur['date_removed'])){
					$r['html']	.= '<tr><td>'.$this->churches_model->get_church_name($cur).'</td><td>'.$cur['role_name'].'</td><td>Ended '.date_offset('m/d/Y', $cur['date_end']).'</td></tr>';
					$count++;
				}
			}
		}
	}
	if(empty($count)){
		$r['html'] .= '<tr><td colspan="4"><h3 class="text-center">No past assignments found.</h3></td></tr>';
	}
	$r['html'] .= '</tbody></table></fieldset>';

	return $r['html'];
}

function save_family_church_assignment($vars){
	$vars['user']		= $this->website_model->get_user_session();
	$r 					= array();
	$result_delete		= array();
	$result_fam			= array();
	$fam				= array();
	$check				= array();

	if(!empty($vars['id_role']) && !empty($vars['id_family']) && !empty($vars['id_church'])){
		$check['id_role']				= $vars['id_role'];
		$check['id_family']				= $vars['id_family'];
		$check['id_church']				= $vars['id_church'];
		$check['assignment_type']		= 'family_to_church';
		$check['id_assignment']			= !empty($vars['id_assignment']) ? $vars['id_assignment'] : null;
		$cur_assign						= $this->website_model->get_assignment_record($check);

		$fam['id_family']				= $check['id_family'];


		switch($vars['id_role']){
			case 230:
			case 232:
				//230 - Home church
				//232 - Claimed church
				if(!empty($cur_assign['id_assignment'])){

					$sql = "UPDATE `ltp_assignments` SET `state` = -2,
							`date_removed` = ".time().",
							`date_end` = ".time().",
							`id_removed` = ".$vars['user']['id_people']."
							WHERE `assignment_type` = 'family_to_church'
							AND `id_role` IN (230,232)
							AND `id_family` = ".$vars['id_family']."
							AND `state` > 0";



					$query = $this->db->query($sql,false);

					if(!empty($query)){
						$result_delete['db_update'] 			= TRUE;
						$result_delete['status'] 				= TRUE;
						$result_delete['id_family']				= $vars['id_family'];
						$result_delete['result']				= 'success';
						$result_delete['method']				= 'update';
						$result_delete['data']					= $vars;
					}
				}


				if($vars['id_role']	== 230){
					$fam['id_church_home']	= $check['id_church'];
				}
				if($vars['id_role']	== 232){
					$fam['id_church_claim']	= $check['id_church'];
				}
				$result_fam			= $this->save_family($fam);

			break;
			case 231:
			case 236:
				//231 - Referred church
				//236 - Recruited by church

				if($vars['id_role']	== 236){
					$fam['id_church_recruited']	= $check['id_church'];
				}
				$result_fam			= $this->save_family($fam);

			break;


		}

		$check['date_start']					= !empty($vars['date_start']) ? $vars['date_start'] : time();
		$check['state']							= 40;
		$r										= $this->website_model->save_assignment($check);
		$r['operations']['delete_assignment']	= $result_delete;
		$r['operations']['fam_update']			= $result_fam;
	}

	return $r;


}

function get_family_last_name($vars){
	$vars	= format_array_vals($vars, 'id_family');
	$name	= '';

	if(!empty($vars['name_parent0_last'])){
		$name .= $vars['name_parent0_last'].' ';
	}

	if(!empty($vars['name_parent1_last'])){
		if(!empty($vars['name_parent0_last']) && hash_challenge($vars['name_parent0_last']) != hash_challenge($vars['name_parent0_last'])){
			$name = ltrim($name);
			$name .= ' / '.$vars['name_parent1_last'];
		}else{
			$name .= $vars['name_parent0_last'].' ';
		}
	}

	if(empty($name) && !empty($vars['name_family'])){
		$cur['family_name']				= trim(str_replace('  ', ' ',$cur['family_name']));
			$parts 							= explode(' ', $cur['family_name']);

			if(stripos(', ', $cur['family_name']) !== false){
				$name_last						= trim($parts[0]);
			}else{
				$name_last						= trim(end($parts));
			}

			if(strtolower($name_last) == 'family'){
				$name_last = trim($parts[0]);
				if(strtolower(trim($parts[0])) == 'the'){
					$name_last 	= format_name($parts[1]);
				}
			}

			$save['id_family']				= $cur['id_family'];
			$save['name_parent0_last']		= format_name($name_last);

			if(in_arrayi('and', $parts) || in_arrayi('&', $parts)){
				$has_couple = true;
			}

			if($has_couple){
				$name			= format_name($name_last);
			}elseif(!$has_couple && trim(strtolower($parts[0])) != $name_last){
				$name 			= format_name($parts[0]);

			}

			$name = $name_last;
	}

	//Double check to make sure the last name is not doubled
	$tmp = explode(' ', trim($name));
	if(!empty($tmp[0]) && !empty($tmp[1])){
		if(hash_challenge($tmp[0]) == hash_challenge($tmp[1])){
			return trim($tmp[0]);
		}
	}

	return trim($name);
}

function get_family_first_name_initial($vars){
	$vars	= format_array_vals($vars, 'id_family');

	if(!empty($vars['name_parent0_first'])){
		$name  = substr($vars['name_parent0_first'], 0,1);
	}

	if(empty($name) && !empty($vars['name_parent0_first'])){
		$name  = substr($vars['name_parent0_first'], 0,1);
	}

	if(!empty($name)){
		return strtoupper($name.'.');
	}

	return '';
}

function get_people_gender_from_role($vars){
	$vars			= format_array_vals($vars, 'id_role');
	$arr_male		= $this->get_parent_role_ids_male();
	$arr_female		= $this->get_parent_role_ids_female();

	if(!empty($vars['id_role'])){
		if(in_array($vars['id_role'], $arr_male)){
			return 'male';
		}
		if(in_array($vars['id_role'], $arr_female)){
			return 'female';
		}

	}
	return null;
}


}//End Class
?>
```
