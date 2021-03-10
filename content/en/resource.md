<?php
Class Resources_model extends CI_Model
{
 function get_ps_resources($vars=null){
	 
	$time_start	= microtime(true);
	
	
	$sql = 	"SELECT r.* FROM `ltp_resources` AS r ";
	$sql .= " WHERE 1=1";
	
	//$vars['group_by']	= 'resource';
	

	if(!empty($vars['id_resource'])){
		$sql .= " AND r.id_resource =  ".$this->db->escape($vars['id_resource']);
	}
	
	if(!empty($vars['view'])){
		switch(strtolower($vars['view'])){
			case 'resources_landing_page':
				$vars['order']					= 'r.order_cat_view ASC, r.resource_name';
				$vars['order_dir']				= 'ASC';
				$vars['show_subcat_resources']	= 1;
				if(empty($vars['id_resource'])){
					$vars['allow_limiters']		= 1;
				}
				
			break;
			case 'affiliate_specific':
				$vars['order']				= 'order_master';
				$vars['order_dir']			= 'ASC';
				$vars['allow_limiters']		= 1;
				
			break;
		}
	}
	
	//bypass specific system generated categories
	//Overrides for popular
	if(!empty($vars['id_resource_cats']) && in_array(5, $vars['id_resource_cats'])){
		unset($vars['id_resource_cats']);
		$vars['order']				= 'r.count_downloads DESC, r.count_views';
		$vars['order_dir']			= 'DESC';
		$vars['limit']				= 20;
		$vars['allow_limiters']		= 1;
	}

	//Overrides for FAM Forum cat
	if(!empty($vars['id_resource_cats']) && in_array(800, $vars['id_resource_cats'])){
		$vars['order']				= 'r.date_add';
		$vars['order_dir']			= 'DESC';
		$vars['allow_limiters']		= 1;
	}
		

	if(!empty($vars['allow_limiters'])){
		if(!empty($vars['resource_name'])){
			$sql .= " AND r.resource_name =  ".$this->db->escape($vars['resource_name']);
		}
		
		if(!empty($vars['resource_slug'])){
			$sql .= " AND LOWER(r.resource_slug) =  ".$this->db->escape(strtolower($vars['resource_slug']));
		}
		
		if(!empty($vars['resource_type'])){
			$sql .= " AND r.resource_type =  ".$this->db->escape($vars['resource_type']);
		}
		
		if(!empty($vars['resource_types'])){
			switch(strtolower($vars['resource_types'])){
				case 'documents':
				case 'docs':
					$sql .= " AND r.resource_type = IN('pdf','doc','docx')";
				break;
			}
		}
		
		if(!empty($vars['search'])){
			$vars['search_match']		= strtolower($vars['search']);
		}
		
		if(!empty($vars['search_match'])){
			$vars['search_match']	= addslashes(strtolower($vars['search_match']));

			$sql .= " AND (LOWER(r.resource_name) LIKE '%%".$vars['search_match']."%%' 	OR LOWER(r.resource_desc_short) LIKE '%%".$vars['search_match']."%%')";
		}
		if(!empty($vars['search_match_deep'])){
			$arr_omit_generics		= array('the', 'and', 'that', 'them', 'then', 'is', 'are');
			$name_parts 	= explode(' ', $vars['search_match_deep']);
			if(!empty($name_parts)){
				$sql .= " AND (";
				$cur_count		= 0;
				foreach($name_parts as $cur_part){
					$cur_part		= addslashes(strtolower($cur_part));
					if(!in_array(hash_challenge($cur_part), $arr_omit_generics)){
						if($cur_count > 0){
							$sql .=" OR ";
						}
						$sql .= " (LOWER(r.resource_name) LIKE '%%".$cur_part."%%' OR LOWER(r.resource_desc_short) LIKE '%%".$cur_part."%%' OR LOWER(r.resource_keywords) LIKE '%%".$cur_part."%%')";
					}
					$cur_count++;
				}
				$sql .= ")";
			}
		}
		/*
		if(!empty($vars['resource_cats'])){
			if(is_numeric($vars['resource_cats'])){
				$cats	= $this->get_ps_resource_cats();
			}
			if(!is_array($vars['resource_cats'])){
				$vars['resource_cats']	= explode(',',$vars['resource_cats']);
			}
			$sql 		.= " AND (";
			$count_cat 	= 1;
			$total_cat	= count($vars['resource_cats']);
			
			foreach($vars['resource_cats'] as $cur_cat){
			//	$sql .= " FIND_IN_SET(1, r.resource_cats) <> 0";
				$sql .= " r.`resource_cats` LIKE '%$cur_cat%'";
				if($total_cat	<  $count_cat){
					$sql .= " OR ";
				}
				$count_cat++;
			}
			$sql .= ")";
		}
		*/
		
		if(!empty($vars['show_all'])){
			
		}elseif(isset($vars['status'])){
			$sql .= " AND r.state = ".$this->db->escape($vars['status']);
		}elseif(isset($vars['state'])){
			$sql .= " AND r.state = ".$this->db->escape($vars['state']);
		}else{
			$sql .= " AND r.state > 0";
		}
		/*
		
		if(empty($vars['bypass_affiliate'])){
			if(!empty($vars['id_affiliates'])){
				if(is_array($vars['id_affiliates'])){
					$vars['id_affiliates'] = implode(',', $vars['id_affiliates']);
				}
				$sql .= " AND (r.id_affiliates IS NULL OR r.id_affiliates IN (".$vars['id_affiliates']."))";
			}elseif(!empty($vars['id_affiliate'])){
				$sql .= " AND (r.id_affiliates IS NULL OR r.id_affiliates =  ".$this->db->escape($vars['id_affiliate']).")";
			}elseif(!empty($_SESSION['affiliate']['id_affiliate']) && !$this->security_model->user_has_access(94)){
				$sql .= " AND (r.id_affiliates IS NULL OR r.id_affiliates =  ".$this->db->escape($_SESSION['affiliate']['id_affiliate']).")";
			}
		}	
		*/
	}
	
	if(!empty($vars['group_by'])){
		switch(strtolower($vars['group_by'])){
			case 'resource':
			case 'resources':
				$sql .= " GROUP BY r.id_resource";
			break;
		}
	}
		
	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY r.resource_name";
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
		echo '<p><strong>$resources_model->get_resources: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>$resources_model->get_resources: </strong>'.$sql.'</p>';
	}
	
	if(!empty($vars['id_resource_cats'])){
		if(!is_array($vars['id_resource_cats'])){
			$vars['id_resource_cats']	= explode(',',$vars['id_resource_cats']);
		}		
	}
	
	//echo '<br />Checkpoint 1:'.(microtime(true) - (int) $time_start);
		
	//Get categories
	$cats	= $this->get_ps_resource_cats();
	if(!empty($cats)){
		foreach($cats as $cur_cat){
			$cats_associated[$cur_cat['id_resource_cat']]	= $cur_cat;
		}
	}

   if($query -> num_rows() > 0){
	   
		$r = $query->result_array();
		
	
		//echo '<br />Checkpoint 2:'.(microtime(true) - (int) $time_start);
		$arr_parent_assoc_cats		= $this->resources_model->get_parent_associated_cats();
		
		foreach($r as $key => $val){
			$can_add = true;
			
			if(!empty($cats_associated)){
				$cur_resource_cats			= explode(',',$val['resource_cats']);
				foreach($cur_resource_cats as $cur_val_cat){
					if(!empty($cats_associated[$cur_val_cat])){
						$r[$key]['categories'][]	= $cats_associated[$cur_val_cat];
					}else{
						$r[$key]['categories'][]	= '';
					}
				}
			}
			//echo '<br />Checkpoint 3:'.(microtime(true) - (int) $time_start);
			
			
			if(!empty($vars['id_resource_cats'])){
				
				
				//dds($arr_parent_assoc_cats);
				$can_add					= false;
				if(!empty($vars['id_resource_cats']) && !empty($val['resource_cats'])){
					$cur_resource_cats			= explode(',',$val['resource_cats']);
					foreach($cur_resource_cats as $cur_val_cat){
						if(in_array($cur_val_cat, $vars['id_resource_cats'])){
							$can_add					= true;
							if(in_array($cur_val_cat, $vars['id_resource_cats'])){
								$can_add					= true;
							}
						}
						//Check for subcategories where parent categories are empty
						//dds($arr_parent_assoc_cats[$cur_val_cat], $cur_val_cat);
						if(!empty($arr_parent_assoc_cats[$cur_val_cat])){
							
							if(in_array($arr_parent_assoc_cats[$cur_val_cat], $vars['id_resource_cats'])){
								$can_add					= true;
							}
						}
							
					}
					if(!empty($vars['show_subcat_resources'])){
						foreach($r[$key]['categories'] as $cur_cat){
							if(in_array($cur_cat['id_resource_cat_parent'], $vars['id_resource_cats'])){	
								$can_add = true;
							}
						}
					}
				}
			}
			//echo '<br />Checkpoint 4:'.(microtime(true) - (int) $time_start);
			
			
			//Fix and format video entries
			if($this->is_video_resource($val)){
				$r[$key]['video_host']	= $this->get_video_resource_host($val);
				$r[$key]['id_video']	= $this->get_video_resource_id($val);
				
			}
			
			//Check for affiliate match
			if(!empty($val['id_affiliates'])){
				$can_add = false;
				$cur_affiliates			= explode(',',$val['id_affiliates']);
				
				if(in_array($this->affiliates_model->get_active_affiliate_id(), $cur_affiliates)){
					$can_add = true;
				}
			}
			
			if($can_add){
				$r[$key]['id_resource_encoded']		= url_enc(numeric_only(str_replace(' ','',$r[$key]['id_resource'])));
				$resource_ids[]						= $val['id_resource'];
			}else{
				unset($r[$key]);
			}
		}
		
		
		//echo '<br />Checkpoint 5:'.(microtime(true) - (int) $time_start);
		return $r;
	 
   }else{
		return null;
   }
 }
 
function get_ps_resource($vars=null){
	
	if(empty($vars['id_resource']) && empty($vars['resource_slug'])){
		return $this->website_model->get_table_schema('ltp_resources');
	}

	$result = $this->get_ps_resources($vars);	

	if(count($result) > 0){
	   $r = $result[0];
		return $r;
	}else{
		return false;
	}
}


function get_parent_associated_cats(){
	$cats 	= $this->get_ps_resources_sub_cats();
	$arr	= array();
	
	if(!empty($cats)){
		foreach($cats as $cur){
			if(!empty($cur['id_resource_cat_parent'])){
				$arr[$cur['id_resource_cat']]	= $cur['id_resource_cat_parent'];
			}
		}
	}
	
	return $arr;
}

function save($data=null){
	$post_check 			= $this->input->post('posted');
	$db_update 				= false;
	$debug					= null;
	$user					= $this->website_model->get_user_session();
	
	if(empty($user['id_people'])){
		$user['id_people']		= 1;
	}
	
	if(empty($data) && isset($post_check)){
		$data 						= $this->input->post();
	}
	
	//Backup initial variables
	$vars					= $data;
	
	//implode array variables
	foreach($data as $key => $val){
		if(is_array($val)){
			$data[$key]	= implode(',',$val);
		}
	}
	
	
	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_resources');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}
	
	 
	$data['date_mod'] 			= time();
	
	if(!isset($data['state'])){
		$data['state'] 				= 1;
	}
	 
	
	//Check to update table first
	if(!empty($data['id_resource'])){
		
		$this->db->where('id_resource', $data['id_resource']);
		if($this->db->update('ltp_resources', $data)){
			$result['db_update'] 			= TRUE;
			$result['status'] 				= TRUE;
			$result['id_resource']			= $data['id_resource'];
			$result['result']				= 'success';
			$result['method']				= 'update';
			$result['data']					= $data;
		}

	}else{
		$data['date_add'] 						= time();
		$data['id_add'] 						= $user['id_people'];
		
		if ($this->db->insert('ltp_resources', $data)){
			$result['db_update'] 				= TRUE;
			$result['status'] 					= TRUE;
			$result['id_resource']				= $this->db->insert_id();
			$result['result']					= 'success';
			$result['method']					= 'insert';
			$result['data']						= $data;
		}
	}
	
	return $result;
}


 function get_ps_resource_cats($vars=null){
	 
	
		
	$sql = 	"SELECT cat.* FROM `ltp_resource_cats` AS cat ";
	$sql .= " WHERE 1=1";
	
	//$vars['group_by']	= 'resource';
	

	if(!empty($vars['id_resource_cat'])){
		$sql .= " AND cat.id_resource_cat =  ".$this->db->escape($vars['id_resource_cat']);
	}
	switch(strtolower($vars['view'])){
		case 'resources_landing_page':
			$vars['order']				= 'order_master ASC, cat.resource_cat_name ';
			$vars['order_dir']			= 'ASC';
			$vars['allow_limiters']		= 1;
		break;
		case 'resources_landing_page_sub_cats':
			$vars['order']				= 'order_sub_cat';
			$vars['order_dir']			= 'ASC';
			$vars['allow_limiters']		= 1;
			
		break;
		
	}
	if(!empty($vars['allow_limiters'])){
		if(!empty($vars['resource_cat_name'])){
			$sql .= " AND cat.resource_cat_name =  ".$this->db->escape($vars['resource_cat_name']);
		}
		
		if(!empty($vars['resource_cat_slug'])){
			$sql .= " AND cat.resource_cat_slug =  ".$this->db->escape($vars['resource_cat_slug']);
		}
		
				
		if(!empty($vars['show_all'])){
			
		}elseif(isset($vars['status'])){
			$sql .= " AND cat.state = ".$this->db->escape($vars['status']);
		}elseif(isset($vars['state'])){
			$sql .= " AND cat.state = ".$this->db->escape($vars['state']);
		}else{
			$sql .= " AND cat.state > 0";
		}
		
		if(empty($vars['bypass_affiliates']) && !$this->affiliates_model->is_active_affiliate_network_partner()){
			$sql .= " AND (cat.is_promise_network_partner IS NULL OR cat.is_promise_network_partner <> 1)";
		}
	}
		
	if(!empty($vars['group_by'])){
		switch(strtolower($vars['group_by'])){
			case 'resource':
			case 'resources':
				$sql .= " GROUP BY cat.id_resource_cat";
			break;
		}
	}
	
	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$vars['order'];
	}else{
		$sql .= " ORDER BY cat.resource_cat_name";
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
		echo '<p><strong>$resources_model->get_resources: </strong>'.$sql.'</p>';
		exit();
	}elseif(!empty($vars['debug'])){
		echo '<p><strong>$resources_model->get_resources: </strong>'.$sql.'</p>';
	}

   if($query -> num_rows() > 0){
	   
		$r = $query->result_array();
		
		foreach($r as $key => $val){
			$r[$key]['id_resource_cat_encoded']		= url_enc(numeric_only(str_replace(' ','',$r[$key]['id_resource_cat'])));
			$resource_cat_ids[]						= $val['id_resource_cat'];
		}
		
		
		
		if(empty($vars['bypass_affiliates'])){
			$affiliates = $this->affiliates_model->get_affiliates();
			if(!empty($affiliates)){
				foreach($affiliates as $cur_aff){
					if($cur_aff['state'] > 0){
						$cat_tmp['id_resource_cat']			= 100000 + $cur_aff['id_affiliate'];
						$cat_tmp['resource_cat_name']		= $cur_aff['affiliate_name'];
						$cat_tmp['resource_cat_slug']		= 'affiliate-'.$this->website_model->slugify($cur_aff['affiliate_name']);
						$cat_tmp['resource_cat_alias']		= 'affiliate-'.$this->website_model->slugify($cur_aff['affiliate_name']);
						$cat_tmp['state']					= 1;
						$cat_tmp['id_resource_cat_encoded']	= url_enc($cat_tmp['id_resource_cat']);
						$r[]	= $cat_tmp;
					}
				}
			}
			
			
		}
		return $r;
	 
   }else{
		return null;
   }
}
 
function get_ps_resources_sub_cats($vars=null){
	$vars['view']					= 'resources_landing_page_sub_cats';
	if(!empty($vars['id_resource_cat'])){
		$vars['id_resource_cat_parent']	= $vars['id_resource_cat'];
	}
	unset($vars['id_resource_cat']);
	return $this->get_ps_resource_cats($vars);
	 
}

function get_ps_resource_name($vars){
	
	if(!empty($vars['resource_name'])){
		return $vars['resource_name'];
	}
	
	return null;
}

function display_resource_avatar($vars){
	echo '';
}

function get_ps_resource_status_from_state($vars){
	return 'Active';
}

function display_list_view_affiliates($vars){
	$r 			= null;
	$i 			= 1;
	$show_count	= 2;
	$total		= 0;
	
	if(!empty($vars['id_affiliates'])){
		if(!is_array($vars['id_affiliates'])){
			$vars['id_affiliates']	= explode(',',$vars['id_affiliates']);
		}
		$total 	= count($vars['id_affiliates']);
		$diff 	= $total - $show_count;
		
		foreach($vars['id_affiliates'] as $cur){
			$r .= '<br />'.$this->affiliates_model->get_affiliate_name_by_id($cur);
			if($i == $show_count){
				$has_hide	= true;
				$r 			.= '<a data-toggle="collapse" data-target="#list_view_affiliates_more_'.$vars['id_resource'].'">Show '.$diff.' More</a>';
				$r 			.= '<div class="collapse" id="list_view_affiliates_more_'.$vars['id_resource'].'">';
			}
			$i++;
		}
		
		if($has_hide){
			$r .= '</div>';
		}
	}
	if($total < 1 && !empty($vars['return_all'])){
		return 'All';
	}
	
	return $r;
}

function display_list_view_access($vars){
	$r 			= null;
	switch($vars['access_level_min']){
		case 35:
			$r = 'Team Leaders+';
		break;
		case 60:
			$r = 'Advocates+';
		break;
		case 790:
			$r = 'Staff - Employee+';
		break;
		case 800:
			$r = 'Staff - Manager+';
		break;
		case 810:
			$r = 'Staff -  Leadership+';
		break;
		case 830:
			$r = 'Staff - Administrator+';
		break;
		
	}	
	return $r;
}


function get_ps_resource_format_name($vars){
	$vars 	= format_array_vals($vars, 'id_resource');
	$r 		= '';
	
	if(empty($vars['resource_format']) && !empty($vars['id_resource'])){
		$vars	= $this->get_ps_resource($vars);
	}
	
	if(empty($vars['resource_format']) && !empty($vars['resource_type'])){
		$vars['resource_format']	= $vars['resource_type'];
	}
	
	if(empty($vars['resource_format']) && !empty($vars['url_download'])){
		$vars['resource_format']	= substr($vars['url_download'], -3);
	}
	
	$vars['resource_format']	= str_replace('.ai', 'ai', $vars['resource_format']);
	
	if(!empty($vars['resource_format'])){
		switch(strtolower($vars['resource_format'])){
			case 'pdf':
				$r = 'PDF';
			break;
			case 'jpg':
			case 'peg':
			case 'jpeg':
				$r = 'JPG';
			break;
			case 'eps':
			case 'psd':
			case 'ai':
			case '.ai':
				$r = 'Adobe';
			break;
			case 'video':
			case 'deo':
			case 'mp4':
			case 'deo':
				$r = 'VIDEO';
			break;
			case 'mp3':
				$r = 'AUDIO';
			break;
			case 'doc':
			case 'docx':
			case 'ocx':
				$r = 'Word Document';
			break;
			case 'ppt':
			case 'pptx':
			case 'ptx':
				$r = 'Powerpoint';
			break;
			case 'xls':
			case 'xlsx':
				$r = 'Excel';
			break;
			case 'mcarchive':
			case 'ive':
				$r = 'Email archive';
			break;
			case 'url':
			case 'link':
			case 'ink':
				$r = 'LINK';
			break;
			default:
				if(stripos($vars['resource_format'], 'pdf') !== false){
					$r = 'PDF';
				}else{
					$r = strtoupper($vars['resource_format']);
				}
			break;
		}
	}
	
	if(!empty($vars['prepend_space'])){
		return ' '.$r;
	}
	if(!empty($vars['append_space'])){
		return $r.' ';
	}
	
	return $r;
}

function get_ps_resource_detail_link($vars){
	$vars 		= format_array_vals($vars, 'id_resource');
	
	if(empty($vars['resource_slug']) && empty($vars['resource_name'])){
		$vars	= $this->get_ps_resource($vars);
	}
	
	if(!empty($vars['resource_slug'])){
		return base_url().'resources/view/'.$vars['resource_slug'];
	}
		
	//return base_url().'resources/view/?i='.url_enc($vars['id_resource']);
	return base_url().'resources/view/'.url_enc($vars['id_resource']);
	
}

function get_ps_resource_download_link($vars){
	$r 							= null;
	$arr_video_providers		= array('youtube.com', 'vimeo.com', 'youtu.be', 'player.vimeo.com');
	if(!empty($vars) && !is_array($vars) && stripos($vars, 'http') !== false){
		$vars 		= format_array_vals($vars, 'url_download');
	}else{
		$vars 		= format_array_vals($vars, 'id_resource');
	}
	
	if(empty($vars['url_download']) && !empty($vars['id_resource'])){
		$vars	= $this->get_ps_resource($vars);
	}
	
	//Overrides for certain file types
	if(!empty($vars['resource_format'])){
		switch(strtolower($vars['resource_format'])){
			case 'mcarchive':
			case 'link':
			case 'url':
				return correct_img_path($vars['url_download']);
			break;
		}
	}
	
	if(!empty($vars['url_download'])){
		$r 		=  base_url().'resources/force_download?f='.url_enc($vars['url_download']).'&r='.url_enc($vars['id_resource']);
		/*
		$parsed_url		= parse_url($vars['url_download']);
		if(!empty($parsed_url['host']) && in_array($parsed_url['host'], $arr_video_providers)){
			$r 		= $vars['url_download'];
		}else{
			$r 		=  base_url().'resources/force_download?f='.url_enc($vars['url_download']);
		}
		*/
	}
		
	
	return $r;
	
}

function get_resource_download_detial_page_header($vars){
	$r = 'Download';
	
	//Backup in case resource format is not set
	if(empty($vars['resource_format']) && !empty($vars['resource_type'])){
		$vars['resource_format']	= $vars['resource_type'];
	}
	
	//Overrides for certain file types
	if(!empty($vars['resource_format'])){
		switch(strtolower($vars['resource_format'])){
			case 'mcarchive':
				$r = 'Read Email Archive';
			break;
			case 'link':
			case 'url':
				$r = 'Visit Site';
			break;
		}
	}
	
	return $r;
}

function get_ps_resource_download_icon($vars){
	$r 			= null;
	$file_type 	= strtolower($this->resources_model->get_ps_resource_format_name($vars));

	switch(strtolower(trim($file_type))){
		case 'mcarchive':
		case 'email archive':
		case 'emailarchive':
		case 'email_archive':
		
			$r = 'fas fa-book-open';
		break;
		case 'url':
		case 'link':
			$r = 'fas fa-external-link-alt';
		break;
		default:
			
		break;
	}
	
	if(empty($r) && !empty($file_type)){
		$r = 'fas fa-file-'.$file_type;
	}
	
	if(empty($r)){
		$r = 'fas fa-download';
	}
	
	return $r;
	
}

function get_ps_resource_category_view_header_title($vars){
	$type_title = $this->resources_model->get_ps_resource_format_name($vars);
	
	switch(strtolower(trim($type_title))){
		case 'mcarchive':
			$type_title	= 'Read From Archive';
		break;
		case 'video':
			$type_title = 'Video';
		break;
		default:
			$type_title = ' '.$type_title;
			
		break;
	}
	
	if(empty($vars['btn_action_title'])){
		return $type_title.' Download';
	}
	
	
	return $type_title;
	
}

function mark_ps_resource_viewed($vars){
	$vars 		= format_array_vals($vars, 'id_resource');
	if(!empty($vars['id_resource'])){
		$sql = "UPDATE `ltp_resources` SET count_views = IFNULL(count_views, 0 ) + 1 WHERE `id_resource` = ".$this->db->escape($vars['id_resource']);
		$query = $this->db->query($sql,false);
	}
}

function mark_ps_resource_downloaded($vars){
	$vars 		= format_array_vals($vars, 'id_resource');
	if(!empty($vars['id_resource'])){
		$sql = "UPDATE `ltp_resources` SET count_downloads = IFNULL(count_downloads, 0 ) + 1 WHERE `id_resource` = ".$this->db->escape($vars['id_resource']);
		$query = $this->db->query($sql,false);
	}
}

function get_ps_resource_shareable_url($vars){
	$vars 		= format_array_vals($vars, 'id_resource');
	
	//Check for internal content first
	if(!empty($vars['resource_slug_msg_template'])){
		$msg = $this->messages_model->get_messaging_template(array('messaging_alias' => $vars['resource_slug_msg_template']));
		
		if(!empty($msg['id_msg_template'])){		
			
			$vars['url_shareable'] = base_url().'page/'.url_enc($msg['id_msg_template']);
			
			if(!empty($msg['key'])){
				$vars['url_shareable']  .= '/?key='.$msg['key'];
			}
		}
	}elseif(empty($vars['resource_slug']) && empty($vars['resource_name'])){
		$vars = $this->resources_model->get_ps_resource(array('id_resource' => $vars['id_resource']));
	}
	
	
	if(!empty($vars['url_shareable'])){
		return $vars['url_shareable'];
	}
	
	
	
	
	return null;
	
}
	
function get_ps_resource_thumbnail_url($vars){
	$vars 		= format_array_vals($vars, 'id_resource');
	$r 			= '';
	$base_url	= base_url().'img/resources/';
	//dds($vars);
	
	if(empty($vars['url_thumbnail']) && empty($vars['resource_name'])){
		$vars	= $this->get_ps_resource($vars);
	}
	
	if(!empty($vars['url_thumbnail'])){
		$r = correct_img_path($vars['url_thumbnail']);
	}
	if(empty($r) && !empty($vars['categories'])){
		$type 	= $this->get_ps_resource_format_name($vars);
		
		
		//Try to find the matching category /type view first
		if(!empty($vars['cat_id_shown'])){
			foreach($vars['categories'] as $cur_cat){
				if(!empty($cur_cat['resource_cat_alias'])){
					if(empty($r) && does_file_exist($base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-'.strtolower(trim($type)).'.jpg') && ($vars['cat_id_shown'] == $cur_cat['id_resource_cat'] || $vars['cat_id_shown'] == $cur_cat['id_resource_cat_parent'])){
						$r = $base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-'.strtolower(trim($type)).'.jpg';
					}
				}
			}
		}
		
		if(empty($r)){
			foreach($vars['categories'] as $cur_cat){
				if(!empty($cur_cat['resource_cat_alias'])){
					if(empty($r) && does_file_exist($base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-'.strtolower(trim($type)).'.jpg')){
						$r = $base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-'.strtolower(trim($type)).'.jpg';
					}
				}
			}
		}
		
		//Try to find the matching category generic view 
		if(empty($r) && !empty($vars['cat_id_shown'])){
			foreach($vars['categories'] as $cur_cat){
				if(!empty($cur_cat['resource_cat_alias'])){
					if(empty($r) && does_file_exist($base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-generic.jpg') && ($vars['cat_id_shown'] == $cur_cat['id_resource_cat'] || $vars['cat_id_shown'] == $cur_cat['id_resource_cat_parent'])){
						$r = $base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-generic.jpg';
					}
				}
			}
		}
		
		if(empty($r)){
			foreach($vars['categories'] as $cur_cat){
				if(!empty($cur_cat['resource_cat_alias'])){
					if(empty($r) && does_file_exist($base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-generic.jpg')){
						$r = $base_url.'img-placeholder-'.strtolower(trim($cur_cat['resource_cat_alias'])).'-generic.jpg';
					}
				}
			}
		}
	}
		
	if(empty($r) && !empty($vars['category_img'])){
		$r = $base_url;
		switch(strtolower($vars['category_img'])){
			default:
				$r .= 'img-placeholder-cat-'.$vars['category_img'].'.jpg';
			break;
		}
	}
	
	if(empty($r)){
		 $type = $this->get_ps_resource_format_name($vars);
		 if(!empty($type)){
			 $r = $base_url;
		 }
		 
		 switch(strtolower(trim($type))){
			case 'pdf':
				$r .= 'img-placeholder-type-pdf.jpg';
			break;
			case 'eps':
			case 'psd':
			case 'ai':
				$r = 'img-placeholder-type-img.jpg';
			break;
			case 'video':
			case 'deo':
			case 'mp4':
				$r .= 'img-placeholder-type-video.jpg';
			break;
			case 'img':
			case 'image':
			case 'jpg':
			case 'png':
			case 'gif':
				$r .= 'img-placeholder-type-img.jpg';
			break;
			case 'word':
			case 'doc':
			case 'docx':
				$r .= 'img-placeholder-type-doc.jpg';
			break;
			case 'powerpoint':
			case 'ppt':
			case 'pptx':
				$r .= 'img-placeholder-type-ppt.jpg';
			break;
			case 'excel':
			case 'xls':
			case 'xlsx':
				$r .= 'img-placeholder-type-xls.jpg';
			break;
		}
	}
	
	if(!empty($r) && $r == $base_url){
		$r = $base_url.'img-placeholder-generic.jpg';
	}elseif(empty($r)){
		$r = $base_url.'img-placeholder-generic.jpg';
	}
	
	
	return $r;
}

function make_resource_thumbnail($vars){
	
	
	//$r = '<div class="resource-img-thumb" style="background: url('.$this->resources_model->get_ps_resource_thumbnail_url($vars).'); background-size: cover; background-position: top center;"><div class="resource-img-thumb-text">'.strtoupper($vars['cur_cat_name']).'<br /> '.$this->get_ps_resource_format_name($vars).'</div></div>';
	$r = '<div class="resource-img-thumb" style="background: url('.$this->resources_model->get_ps_resource_thumbnail_url($vars).'?1234567890); background-size: cover; background-position: top center;"><div class="resource-img-thumb-text">'.$this->get_ps_resource_format_name($vars).'</div></div>';
	return $r;
}

function get_ps_resource_creator($vars){
	$r 					= '';
	$affiliate			= '';
	$people				= '';
	$church				= '';
	$has_affiliate		= false;
	$has_church			= false;
	$has_people			= false;
	
	if(!empty($vars['id_creator_affiliate'])){
		$affiliate = $this->affiliates_model->get_affiliate_name_by_id($vars['id_creator_affiliate']);
	}
	if(!empty($vars['id_creator_church'])){
		$church = $this->churches_model->get_church_name_by_id($vars['id_creator_church']);
	}
	if(!empty($vars['id_creator_people'])){
		$peep = $this->people_model->get_person(array('id_people' => $vars['id_creator_people']));
		if(!empty($peep['name_first']) && !empty($peep['name_last'])){
			$people = $peep['name_first'].' '.$this->website_model->display_format_people_name_last($peep['name_last']);
		}
	}
	
	if(!empty($people)){
		$r  			= $people;
		$has_people		= true;
	}
	
	if(!$has_people && !empty($church)){
		$r  			= $church;
		$has_church		= true;
	}
	
	if($has_people && !empty($church)){
		$r  			.= ' at '.$church;
		$has_church		= true;
	}
	
	if(!$has_people && !$has_church && !empty($affiliate)){
		$r  				= $affiliate;
		$has_affiliate		= true;
	}
	
	if($has_church && !empty($affiliate)){
		$r  				.= ' and '.$affiliate;
		$has_affiliate		= true;
	}
	
	return $r;
}

function is_video_resource($vars){
	if(!empty($vars['resource_format'])){
		switch(strtolower($vars['resource_format'])){
			case 'mp4':
			case 'video':
			case 'vimeo':
			case 'youtube':
				return true;
			break;
		}
	}
	
	if(!empty($vars['url_download'])){
		if(stripos($vars['url_download'], 'vimeo.com') !== false){
			return true;
		}
	}
	
	return false;
}

function get_video_resource_host($vars){
	
	if(!empty($vars['url_download'])){
		if(stripos($vars['url_download'], 'vimeo.com') !== false){
			return 'vimeo';
		}
	}
	
	if(!empty($vars['url_download'])){
		if(stripos($vars['url_download'], 'youtube.com') !== false){
			return 'youtube';
		}
	}
	
	if(!empty($vars['url_download'])){
		if(stripos($vars['url_download'], 'youtu.be') !== false){
			return 'youtube';
		}
	}
	
	return null;
}

function get_video_resource_id($vars){
	$host = $this->get_video_resource_host($vars);
	if(!empty($host)){
		switch(strtolower($host)){
			case 'vimeo':
				$parsed_download_url	= parse_url($vars['url_download']);
				$query 					= explode('/',$parsed_download_url['path']);
				if(!empty($query[1])){
					return $query[1];
				}
			break;
		}
	}
	
}

function make_resource_detail_download_button($vars){
	$vars 		= format_array_vals( $vars, 'id_resource');
	$target		= '_self';
	$icon		= $this->get_ps_resource_download_icon($vars);
	$verb		= 'Download';
	
	if(!empty($vars['id_resource']) && empty($vars['resource_name'])){
		$vars	= $this->get_ps_resource($vars);
	}
	
	//Backup in case resource format is not set
	if(empty($vars['resource_format']) && !empty($vars['resource_type'])){
		$vars['resource_format']	= $vars['resource_type'];
	}
	
	
	if(!empty($vars['resource_format'])){
		switch(strtolower($vars['resource_format'])){
			case 'mcarchive':
				$verb 		= 'Read';
				$target		= '_blank';
				
			break;
			case 'link':
			case 'url':
				$verb 		= 'Visit';
				$target		= '_blank';
			break;
		}
	}

	return '<a class="btn btn-default btn-block" href="'.$this->resources_model->get_ps_resource_download_link($vars).'" target="'.$target.'"><i class="'.$icon.'"></i> '.$verb.'</a>';

}

function can_show_cat($vars){
	$user			= $this->website_model->get_user_session();
	$can_show_cat	= false;
	
	if($vars['id_resource_cat']	> 100000){
		if(($vars['id_resource_cat'] - 100000) == $this->affiliates_model->get_active_affiliate_id()){
			$can_show_cat = true;
		}
	}elseif(!empty($vars['access_level_min']) && $this->security_model->user_has_access($vars['access_level_min'])){
		$can_show_cat = true;
	}elseif(empty($vars['access_level_min'])){
		$can_show_cat = true;
	}
	
	return $can_show_cat;
	
}

	
}//End Class
?>